import { VertexAI } from '@google-cloud/vertexai';
import dotenv from 'dotenv';
import { text } from 'express';

dotenv.config();

class AIAnalysis {
  static projectId = 'decent-micron-433601-e8';
  static location = 'us-central1';
  static modelName = 'gemini-1.5-flash-001';

  static async analyzeData(data, dataType) {
    // Initialize Vertex AI
    const vertexAI = new VertexAI({
      project: this.projectId,
      location: this.location,
    });

    // Load the model
    const generativeModel = vertexAI.getGenerativeModel({
      model: this.modelName,
    });

    // The prompt
    const prompt = this.createPrompt(data, dataType);

    try {
      // Generate content
      const result = await generativeModel.generateContent(prompt);
      const response = await result.response;
      const textResponse = response.candidates[0].content.parts[0].text;

      console.log(textResponse);

      // Return the response
      return textResponse;
    } catch (error) {
      console.error('AI analysis error:', error);
      throw new Error(`Failed to analyze ${dataType}`);
    }
  }

  static createPrompt(data, dataType) {
    switch (dataType) {
      case 'goldPrices':
        return `Analyze the following gold price data (24k gold per gram) from USD to EGP:

${JSON.stringify(data, null, 2)}

Provide a concise summary of insights in plain text, without any formatting symbols. Structure your response as follows:

1. Overall Trend:
   [Describe whether prices are generally increasing, decreasing, or stable]

2. Current Direction:
   [State whether prices are currently going up, down, or staying the same]

3. Key Observations:
   - [Point 1]
   - [Point 2]
   - [Point 3 (if applicable)]

4. Future Prediction:
   [Predict whether prices are likely to increase, decrease, or remain stable in the near future]

5. Confidence Level:
   [State how confident you are in this prediction based on the available data]

Make a prediction regardless of the amount of data provided. If the data is limited, base the prediction on the visible trend and mention that it's a short-term forecast.

Use clear, simple language suitable for a general audience. Avoid technical jargon and keep each section concise for easy reading on a webpage.`;

      case 'exchangeRates':
        return `Analyze the following USD to EGP exchange rate data:

${JSON.stringify(data, null, 2)}

Provide a concise summary of insights in plain text, without any formatting symbols. Structure your response as follows:

1. Overall Trend:
   [Describe whether the EGP is generally strengthening, weakening, or stable against the USD]

2. Current Direction:
   [State whether the exchange rate is currently increasing, decreasing, or staying the same]

3. Key Observations:
   - [Point 1]
   - [Point 2]
   - [Point 3 (if applicable)]

4. Future Prediction:
   [Predict whether the EGP is likely to strengthen, weaken, or remain stable against the USD in the near future]

5. Confidence Level:
   [State how confident you are in this prediction based on the available data]


Make a prediction regardless of the amount of data provided. If the data is limited, base the prediction on the visible trend and mention that it's a short-term forecast.

Use clear, simple language suitable for a general audience. Avoid technical jargon and keep each section concise for easy reading on a webpage. Remember, a higher number means more EGP per USD, indicating a weaker EGP.`;

      default:
        throw new Error(`Unsupported dataType ${dataType}`);
    }
  }
}
export default AIAnalysis;
