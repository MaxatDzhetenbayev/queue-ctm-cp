import { axiosApi } from "@/shared/lib/client";

export interface CenterDto {
  id: string;
  name: { ru?: string; kz?: string; [key: string]: string | undefined };
}

export interface CenterDetailDto extends CenterDto {
  centerServices?: Array<{
    id: string;
    serviceId: string;
    service: { id: string; name: Record<string, string> };
  }>;
  departments?: Array<{
    id: string;
    departmentId: string | null;
    department: { id: string; name: Record<string, string> } | null;
  }>;
}

export async function fetchCenters(): Promise<CenterDto[]> {
  const response = await axiosApi.get<CenterDto[]>("/centers");
  return response.data;
}

export async function getCenter(id: string): Promise<CenterDetailDto | null> {
  const response = await axiosApi.get<CenterDetailDto>(`/centers/${id}`);
  return response.data;
}

export async function createCenter(data: {
  name: { ru?: string; kz?: string };
}): Promise<string> {
  const response = await axiosApi.post<string>("/centers", data);
  return response.data;
}

export async function updateCenter(
  id: string,
  data: { name?: { ru?: string; kz?: string } }
): Promise<CenterDto> {
  const response = await axiosApi.patch<CenterDto>(`/centers/${id}`, data);
  return response.data;
}

export async function deleteCenter(id: string): Promise<void> {
  await axiosApi.delete(`/centers/${id}`);
}
