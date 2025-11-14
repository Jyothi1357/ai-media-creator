

import { GoogleGenAI, Modality, Part } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const model = 'gemini-2.5-flash-image';

const toolPrompts: Record<string, string> = {
    'youtube-thumbnail': `Create a cinematic-style, visually stunning, and click-worthy YouTube thumbnail with a 16:9 aspect ratio. The design should have dramatic lighting, a sense of epic scale, and a professional, movie-poster-like feel. It must be bold, high-contrast, and feature large, easily readable text that captures attention. The theme is: "[PROMPT]". If a reference image is provided, seamlessly integrate its main subject into the thumbnail, enhancing them with the cinematic style while maintaining a professional look.`,
    'instagram-reel': `Generate a captivating cover for an Instagram Reel with a 9:16 aspect ratio. The design should be trendy, vibrant, and optimized for a vertical mobile view. The theme is: "[PROMPT]". Use eye-catching elements and text. If a reference image is present, it should be the centerpiece of the design.`,
    'poster': `Design a professional and eye-catching poster. The concept is: "[PROMPT]". The poster should have a clear visual hierarchy, compelling imagery, and stylish typography. If a reference image is provided, use it as the main visual element, enhancing it to fit the poster's theme.`,
    'photo-to-cartoon': `Transform the person in this photo into a classic oil painting art style, while keeping everything else in the image the same. It is crucial to maintain the original composition. Specifically, you must preserve and recognize the person's facial features, hairstyle, dress/clothing, and any ornaments/jewelry. The background of the photo must also remain exactly the same, only rendered in the same oil painting style as the person. Do not change the scene or elements. The user's specific request for this transformation is: "[PROMPT]".`,
    'photo-to-god': `CRITICAL INSTRUCTION: The facial features, skin tone, and facial structure of every person in the generated image MUST BE 100% IDENTICAL to the original photo. This is the single most important rule. Do not alter the face at all. After fulfilling this critical instruction, transform every person (male or female) into a unique Hindu god or goddess. Adorn them with majestic, traditional Hindu divine jewelry and dress them in ethereal, god-like attire appropriate for Hindu deities. The final image must feature dramatic, divine lighting that enhances the majestic theme. Generate a crystal-clear, high-quality AI image. The background should also be transformed into something awe-inspiring, like a temple or celestial scene, that complements the Hindu divine theme. The user's specific request for this transformation is: "[PROMPT]".`,
    'photo-to-ai': `Convert the provided reference photo into a new, stunning AI-generated image based on the user's prompt: "[PROMPT]". Reimagine the photo with a different style, setting, or concept, while using the original photo's composition and subject as a strong reference. The output should be a high-quality, artistic interpretation with a new background that complements the theme.`,
    'logo': `Design a modern, minimalist logo. The brand or concept is: "[PROMPT]". The logo must be simple, memorable, and visually appealing. It should be effective in both color and black & white. Generate it on a clean, solid white background for easy use. The style should be clean and vector-like.`
};


interface GenerateAssetParams {
  toolId: string;
  prompt: string;
  imagePart?: Part;
}

export const generateCreativeAsset = async ({ toolId, prompt, imagePart }: GenerateAssetParams): Promise<string> => {
  const specificPrompt = toolPrompts[toolId]?.replace('[PROMPT]', prompt);
  if (!specificPrompt) {
    throw new Error(`Invalid toolId: ${toolId}`);
  }

  const contentParts: Part[] = [];
  if (imagePart) {
    contentParts.push(imagePart);
  }
  contentParts.push({ text: specificPrompt });

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: contentParts,
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return part.inlineData.data;
      }
    }

    throw new Error("No image data found in the AI response");

  } catch (error) {
    console.error("Error generating creative asset:", error);
    throw new Error("Failed to communicate with the AI model. Please try again.");
  }
};