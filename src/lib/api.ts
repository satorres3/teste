import { LLMResponse } from '../types/api';

export const callLLM = async (message: string): Promise<LLMResponse> => {
  return { response: 'Mock LLM response' };
};
