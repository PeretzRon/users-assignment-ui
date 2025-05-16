import { ApiError } from '../components/shared/Errors/api-error';

type ApiResponse<T> = {
  statusCode: number;
  path: string;
  data: T;
};

export async function fetchData<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);


  if (!response.ok) {
    const text = await response.text();
    throw new ApiError(response.status, text || 'Something went wrong');
  }

  const json: ApiResponse<T> = await response.json();
  return json.data;
}
