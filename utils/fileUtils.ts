
import { Part } from "@google/genai";

/**
 * Converts a File object to a GoogleGenAI.Part object.
 * This involves reading the file as a base64 string.
 */
export const fileToGenerativePart = async (file: File): Promise<Part> => {
  const base64String = await fileToBase64(file);
  return {
    inlineData: {
      mimeType: file.type,
      data: base64String,
    },
  };
};

/**
 * Converts a File object to a base64 encoded string.
 */
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = (reader.result as string).split(',')[1];
      if (result) {
        resolve(result);
      } else {
        reject(new Error("Failed to convert file to base64"));
      }
    };
    reader.onerror = (error) => reject(error);
  });
};
