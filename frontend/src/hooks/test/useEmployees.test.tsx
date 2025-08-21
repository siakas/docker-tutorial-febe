import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import React from "react";
import { vi } from "vitest";

import * as employeeApi from "@/lib/api/employee";
import { Employee, EmployeeFormData } from "@/lib/validations/employee";

import {
  useCreateEmployee,
  useDeleteEmployee,
  useEmployee,
  useEmployees,
  useUpdateEmployee,
} from "../useEmployees";

// API関数をモック化
vi.mock("@/lib/api/employee");

// テスト用のモックデータ
const mockEmployee: Employee = {
  id: 1,
  employeeId: "EMP001",
  firstName: "太郎",
  lastName: "田中",
  email: "tanaka@example.com",
  phoneNumber: "090-1234-5678",
  position: "エンジニア",
  salary: "5000000",
  hireDate: "2023-04-01",
  departmentId: 1,
  department: {
    id: 1,
    name: "開発部",
    description: "システム開発部門",
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
  },
  isActive: true,
  createdAt: "2023-04-01T00:00:00Z",
  updatedAt: "2023-04-01T00:00:00Z",
};

const mockEmployees: Employee[] = [
  mockEmployee,
  {
    id: 2,
    employeeId: "EMP002",
    firstName: "花子",
    lastName: "佐藤",
    email: "sato@example.com",
    phoneNumber: "080-9876-5432",
    position: "デザイナー",
    salary: "4500000",
    hireDate: "2023-05-15",
    departmentId: 2,
    department: {
      id: 2,
      name: "デザイン部",
      description: "UI/UXデザイン部門",
      createdAt: "2023-01-01T00:00:00Z",
      updatedAt: "2023-01-01T00:00:00Z",
    },
    isActive: true,
    createdAt: "2023-05-15T00:00:00Z",
    updatedAt: "2023-05-15T00:00:00Z",
  },
];

const mockEmployeeFormData: EmployeeFormData = {
  employeeId: "EMP003",
  firstName: "次郎",
  lastName: "山田",
  email: "yamada@example.com",
  phoneNumber: "070-1111-2222",
  position: "マネージャー",
  salary: "6000000",
  hireDate: "2024-01-01",
  departmentId: 1,
  isActive: true,
};

// テスト用のQueryClientを作成するヘルパー関数
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
    logger: {
      log: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    },
  });

// テスト用のラッパーコンポーネント
const createWrapper = (queryClient: QueryClient) => {
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe("useEmployees", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = createTestQueryClient();
    vi.clearAllMocks();
  });

  afterEach(() => {
    queryClient.clear();
  });

  describe("useEmployees", () => {
    it("社員一覧を正常に取得できる", async () => {
      // API関数のモック設定
      vi.mocked(employeeApi.fetchEmployees).mockResolvedValue(mockEmployees);

      const { result } = renderHook(() => useEmployees(), {
        wrapper: createWrapper(queryClient),
      });

      // 初期状態の確認
      expect(result.current.isLoading).toBe(true);
      expect(result.current.data).toBeUndefined();
      expect(result.current.error).toBeNull();

      // データ取得完了まで待機
      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      // 取得結果の確認
      expect(result.current.data).toEqual(mockEmployees);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(employeeApi.fetchEmployees).toHaveBeenCalledTimes(1);
    });

    it("社員一覧取得時にエラーが発生した場合エラー状態になる", async () => {
      // API関数のモック設定（エラー）
      const mockError = new Error("Network Error");
      vi.mocked(employeeApi.fetchEmployees).mockRejectedValue(mockError);

      const { result } = renderHook(() => useEmployees(), {
        wrapper: createWrapper(queryClient),
      });

      // エラー状態になるまで待機
      await waitFor(() => expect(result.current.isError).toBe(true));

      // エラー状態の確認
      expect(result.current.data).toBeUndefined();
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toEqual(mockError);
      expect(employeeApi.fetchEmployees).toHaveBeenCalledTimes(1);
    });

    it("正しいクエリキーが使用される", async () => {
      vi.mocked(employeeApi.fetchEmployees).mockResolvedValue(mockEmployees);

      const { result } = renderHook(() => useEmployees(), {
        wrapper: createWrapper(queryClient),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      // キャッシュされたデータの確認
      const cachedData = queryClient.getQueryData(["employees"]);
      expect(cachedData).toEqual(mockEmployees);
    });
  });

  describe("useEmployee", () => {
    it("指定IDの社員情報を正常に取得できる", async () => {
      const employeeId = 1;
      vi.mocked(employeeApi.fetchEmployee).mockResolvedValue(mockEmployee);

      const { result } = renderHook(() => useEmployee(employeeId), {
        wrapper: createWrapper(queryClient),
      });

      // 初期状態の確認
      expect(result.current.isLoading).toBe(true);
      expect(result.current.data).toBeUndefined();

      // データ取得完了まで待機
      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      // 取得結果の確認
      expect(result.current.data).toEqual(mockEmployee);
      expect(result.current.isLoading).toBe(false);
      expect(employeeApi.fetchEmployee).toHaveBeenCalledWith(employeeId);
      expect(employeeApi.fetchEmployee).toHaveBeenCalledTimes(1);
    });

    it("社員詳細取得時にエラーが発生した場合エラー状態になる", async () => {
      const employeeId = 1;
      const mockError = new Error("Employee not found");
      vi.mocked(employeeApi.fetchEmployee).mockRejectedValue(mockError);

      const { result } = renderHook(() => useEmployee(employeeId), {
        wrapper: createWrapper(queryClient),
      });

      // エラー状態になるまで待機
      await waitFor(() => expect(result.current.isError).toBe(true));

      // エラー状態の確認
      expect(result.current.data).toBeUndefined();
      expect(result.current.error).toEqual(mockError);
      expect(employeeApi.fetchEmployee).toHaveBeenCalledWith(employeeId);
    });

    it("無効なIDが渡された場合はクエリが実行されない", () => {
      // 0, null, undefinedの場合はenabledがfalseになる
      const invalidIds = [0, null, undefined] as const;

      invalidIds.forEach((invalidId) => {
        vi.clearAllMocks();

        const { result } = renderHook(() => useEmployee(invalidId as number), {
          wrapper: createWrapper(queryClient),
        });

        // クエリが実行されないことを確認
        expect(result.current.isFetching).toBe(false);
        expect(result.current.isLoading).toBe(false);
        expect(employeeApi.fetchEmployee).not.toHaveBeenCalled();
      });
    });

    it("正しいクエリキーが使用される", async () => {
      const employeeId = 1;
      vi.mocked(employeeApi.fetchEmployee).mockResolvedValue(mockEmployee);

      const { result } = renderHook(() => useEmployee(employeeId), {
        wrapper: createWrapper(queryClient),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      // キャッシュされたデータの確認
      const cachedData = queryClient.getQueryData(["employees", employeeId]);
      expect(cachedData).toEqual(mockEmployee);
    });
  });

  describe("useCreateEmployee", () => {
    it("社員を正常に作成できる", async () => {
      const newEmployee = { ...mockEmployee, id: 3 };
      vi.mocked(employeeApi.createEmployee).mockResolvedValue(newEmployee);

      const { result } = renderHook(() => useCreateEmployee(), {
        wrapper: createWrapper(queryClient),
      });

      // 初期状態の確認
      expect(result.current.isPending).toBe(false);

      // mutation実行
      result.current.mutate(mockEmployeeFormData);

      // 完了まで待機
      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      // 実行結果の確認
      expect(result.current.data).toEqual(newEmployee);
      expect(result.current.isPending).toBe(false);
      expect(employeeApi.createEmployee).toHaveBeenCalledWith(
        mockEmployeeFormData
      );
      expect(employeeApi.createEmployee).toHaveBeenCalledTimes(1);
    });

    it("社員作成時にエラーが発生した場合エラー状態になる", async () => {
      const mockError = new Error("Creation failed");
      vi.mocked(employeeApi.createEmployee).mockRejectedValue(mockError);

      const { result } = renderHook(() => useCreateEmployee(), {
        wrapper: createWrapper(queryClient),
      });

      // mutation実行
      result.current.mutate(mockEmployeeFormData);

      // エラー状態になるまで待機
      await waitFor(() => expect(result.current.isError).toBe(true));

      // エラー状態の確認
      expect(result.current.error).toEqual(mockError);
      expect(result.current.isPending).toBe(false);
    });

    it("成功時に社員一覧のキャッシュが無効化される", async () => {
      const newEmployee = { ...mockEmployee, id: 3 };
      vi.mocked(employeeApi.createEmployee).mockResolvedValue(newEmployee);

      // 社員一覧を事前にキャッシュ
      queryClient.setQueryData(["employees"], mockEmployees);

      const invalidateQueriesSpy = vi.spyOn(queryClient, "invalidateQueries");

      const { result } = renderHook(() => useCreateEmployee(), {
        wrapper: createWrapper(queryClient),
      });

      result.current.mutate(mockEmployeeFormData);

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      // キャッシュ無効化の確認
      expect(invalidateQueriesSpy).toHaveBeenCalledWith({
        queryKey: ["employees"],
      });
    });
  });

  describe("useUpdateEmployee", () => {
    it("社員情報を正常に更新できる", async () => {
      const updatedEmployee = { ...mockEmployee, firstName: "更新太郎" };
      const updateData = { id: 1, data: mockEmployeeFormData };

      vi.mocked(employeeApi.updateEmployee).mockResolvedValue(updatedEmployee);

      const { result } = renderHook(() => useUpdateEmployee(), {
        wrapper: createWrapper(queryClient),
      });

      // mutation実行
      result.current.mutate(updateData);

      // 完了まで待機
      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      // 実行結果の確認
      expect(result.current.data).toEqual(updatedEmployee);
      expect(employeeApi.updateEmployee).toHaveBeenCalledWith(
        updateData.id,
        updateData.data
      );
    });

    it("成功時に該当社員と社員一覧のキャッシュが無効化される", async () => {
      const updatedEmployee = { ...mockEmployee, firstName: "更新太郎" };
      const updateData = { id: 1, data: mockEmployeeFormData };

      vi.mocked(employeeApi.updateEmployee).mockResolvedValue(updatedEmployee);

      const invalidateQueriesSpy = vi.spyOn(queryClient, "invalidateQueries");

      const { result } = renderHook(() => useUpdateEmployee(), {
        wrapper: createWrapper(queryClient),
      });

      result.current.mutate(updateData);

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      // 両方のキャッシュが無効化されることを確認
      expect(invalidateQueriesSpy).toHaveBeenCalledWith({
        queryKey: ["employees", updateData.id],
      });
      expect(invalidateQueriesSpy).toHaveBeenCalledWith({
        queryKey: ["employees"],
      });
    });
  });

  describe("useDeleteEmployee", () => {
    it("社員を正常に削除できる", async () => {
      const employeeId = 1;
      vi.mocked(employeeApi.deleteEmployee).mockResolvedValue();

      const { result } = renderHook(() => useDeleteEmployee(), {
        wrapper: createWrapper(queryClient),
      });

      // mutation実行
      result.current.mutate(employeeId);

      // 完了まで待機
      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      // 実行結果の確認
      expect(employeeApi.deleteEmployee).toHaveBeenCalledWith(employeeId);
      expect(employeeApi.deleteEmployee).toHaveBeenCalledTimes(1);
    });

    it("削除時にエラーが発生した場合エラー状態になる", async () => {
      const employeeId = 1;
      const mockError = new Error("Deletion failed");
      vi.mocked(employeeApi.deleteEmployee).mockRejectedValue(mockError);

      const { result } = renderHook(() => useDeleteEmployee(), {
        wrapper: createWrapper(queryClient),
      });

      result.current.mutate(employeeId);

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(result.current.error).toEqual(mockError);
    });

    it("成功時に社員一覧のキャッシュが無効化される", async () => {
      const employeeId = 1;
      vi.mocked(employeeApi.deleteEmployee).mockResolvedValue();

      const invalidateQueriesSpy = vi.spyOn(queryClient, "invalidateQueries");

      const { result } = renderHook(() => useDeleteEmployee(), {
        wrapper: createWrapper(queryClient),
      });

      result.current.mutate(employeeId);

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(invalidateQueriesSpy).toHaveBeenCalledWith({
        queryKey: ["employees"],
      });
    });
  });
});