import { GoogleGenAI } from "@google/genai";

// Initialize the client with the API key from the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Processes an image file to ensure it matches API requirements (JPEG format).
 * Resizes if necessary to optimize performance and ensure compatibility.
 */
const prepareImageForAPI = (file: File): Promise<{ mimeType: string; data: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        
        // Resize logic to ensure we don't send massive images
        // Max dimension 1536px is usually plenty for a coloring page reference
        let width = img.width;
        let height = img.height;
        const maxDim = 1536; 
        
        if (width > maxDim || height > maxDim) {
          const ratio = Math.min(maxDim / width, maxDim / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error("Could not get canvas context"));
          return;
        }
        
        // Draw white background first to handle transparent PNGs correctly
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to JPEG
        // This ensures the MIME type is always image/jpeg, supported by Gemini
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        const base64Data = dataUrl.split(',')[1];
        
        resolve({
          mimeType: 'image/jpeg',
          data: base64Data
        });
      };
      img.onerror = () => reject(new Error("Failed to load image for processing"));
    };
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Generates a coloring book page from an uploaded image.
 */
export const generateColoringPage = async (imageFile: File): Promise<string> => {
  try {
    // Process the image to ensure it is a supported JPEG format
    const { mimeType, data } = await prepareImageForAPI(imageFile);

    const prompt = `
      Transform this image into a high-quality, black and white coloring book page for children.
      Rules:
      1. Strictly black outlines on a pure white background.
      2. No grayscale, no shading, no colors.
      3. Bold, clear lines suitable for coloring with crayons.
      4. Simplify complex textures into outline shapes.
      5. Keep the main subject recognizable (e.g., if it's a toy car, keep it a toy car).
      6. Return the result as an image.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: data,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
    });

    // Extract the image from the response parts
    let generatedImageBase64 = null;

    if (response.candidates && response.candidates[0].content && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          generatedImageBase64 = part.inlineData.data;
          break;
        }
      }
    }

    if (!generatedImageBase64) {
      // If no image found in parts, check if the model refused or returned text only
      const textOutput = response.text || "No details provided.";
      throw new Error(`The model did not return an image. It might have said: ${textOutput}`);
    }

    return `data:image/png;base64,${generatedImageBase64}`;

  } catch (error: any) {
    console.error("Gemini Generation Error:", error);
    // Improve error message for user
    let errorMessage = error.message || "Failed to generate coloring page.";
    if (errorMessage.includes("400")) {
        errorMessage = "There was an issue with the image format. Please try a different photo.";
    }
    throw new Error(errorMessage);
  }
};
