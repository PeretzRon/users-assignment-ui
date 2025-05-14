type ApiResponse<T> = {
  statusCode: number;
  path: string;
  data: T;
};

export async function fetchData<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Something went wrong');
  }

  const json: ApiResponse<T> = await response.json();
  return json.data;
}
