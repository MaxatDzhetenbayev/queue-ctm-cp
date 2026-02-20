import { axiosApi } from "@/shared/lib/client";

export interface DirectorItem {
  id: string;
  login: string;
  role: string;
  profile: { fullName: string; phone: string };
  employeeInfo: {
    centerId: string;
    status: string;
    isOnline: boolean;
    center: { id: string; name: Record<string, string> };
  };
}

export interface DirectorListResponse {
  directors: DirectorItem[];
  total: number;
  page: number;
  totalPages: number;
}

export async function fetchDirectorList(
  centerId: string,
  params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
  }
): Promise<DirectorListResponse> {
  const response = await axiosApi.get<DirectorListResponse>(
    "/users/directors/center",
    { params: { centerId, ...params } }
  );
  return response.data;
}
