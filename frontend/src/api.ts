const BASE_API_URL = 'http://localhost:3001/api';

export const getLatestText = async (): Promise<string> => {
  try {
    const res = await fetch(`${BASE_API_URL}/retrieve-text`);
    const result = await res.json();
    return result.text;
  } catch (err) {
    console.error('Failed to load the latest text:', err);
    throw err;
  }
};

export const submitText = async (text: string): Promise<string> => {
  try {
    const res = await fetch(`${BASE_API_URL}/create-answer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: text }),
    });
    const result = await res.json();
    return result.text;
  } catch (err) {
    console.error('Error submitting text:', err);
    throw err;
  }
};
