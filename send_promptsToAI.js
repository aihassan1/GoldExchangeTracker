import { VertexAI } from '@google-cloud/vertexai';

// TODO: Replace with your project ID
const projectId = 'decent-micron-433601-e8';
const location = 'us-central1';
const modelName = 'gemini-1.5-flash-001';

async function generateContent() {
  // Initialize Vertex AI
  const vertexAI = new VertexAI({ project: projectId, location: location });

  // Load the model
  const generativeModel = vertexAI.getGenerativeModel({
    model: modelName,
  });

  // The prompt
  const prompt = 'how can i improve my skills';

  try {
    // Generate content
    const result = await generativeModel.generateContent(prompt);
    const response = await result.response;

    // Print the response
    console.log(response.candidates[0].content.parts[0].text);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

generateContent();
