import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";

import * as departmentApi from "@/lib/api/department";
import { Department } from "@/lib/validations/employee";

import { useDepartments } from "../useDepartments";

// API関数をモック化
vi.mock("@/lib/api/department");

// テスト用のモックデータ
const mockDepartments: Department[] = [
  {
    id: 1,
    name: "開発部",
    description: "システム開発部門",
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
  },
  {
    id: 2,
    name: "デザイン部",
    description: "UI/UXデザイン部門",
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
  },
  {
    id: 3,
    name: "営業部",
    description: "営業・マーケティング部門",
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
  },
];

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

describe("useDepartments", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = createTestQueryClient();
    vi.clearAllMocks();
  });

  afterEach(() => {
    queryClient.clear();
  });

  it("部署一覧を正常に取得できる", async () => {
    // API関数のモック設定
    vi.mocked(departmentApi.fetchDepartments).mockResolvedValue(
      mockDepartments,
    );

    const { result } = renderHook(() => useDepartments(), {
      wrapper: createWrapper(queryClient),
    });

    // 初期状態の確認
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeNull();

    // データ取得完了まで待機
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // 取得結果の確認
    expect(result.current.data).toEqual(mockDepartments);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(departmentApi.fetchDepartments).toHaveBeenCalledTimes(1);
  });

  it("部署一覧取得時にエラーが発生した場合エラー状態になる", async () => {
    // API関数のモック設定（エラー）
    const mockError = new Error("Network Error");
    vi.mocked(departmentApi.fetchDepartments).mockRejectedValue(mockError);

    const { result } = renderHook(() => useDepartments(), {
      wrapper: createWrapper(queryClient),
    });

    // エラー状態になるまで待機
    await waitFor(() => expect(result.current.isError).toBe(true));

    // エラー状態の確認
    expect(result.current.data).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toEqual(mockError);
    expect(departmentApi.fetchDepartments).toHaveBeenCalledTimes(1);
  });

  it("正しいクエリキーが使用される", async () => {
    vi.mocked(departmentApi.fetchDepartments).mockResolvedValue(
      mockDepartments,
    );

    const { result } = renderHook(() => useDepartments(), {
      wrapper: createWrapper(queryClient),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // キャッシュされたデータの確認
    const cachedData = queryClient.getQueryData(["departments"]);
    expect(cachedData).toEqual(mockDepartments);
  });

  it("staleTime設定により5分間はデータが新鮮とみなされる", async () => {
    vi.mocked(departmentApi.fetchDepartments).mockResolvedValue(
      mockDepartments,
    );

    const { result, rerender } = renderHook(() => useDepartments(), {
      wrapper: createWrapper(queryClient),
    });

    // 初回データ取得完了まで待機
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // API関数が1回呼ばれたことを確認
    expect(departmentApi.fetchDepartments).toHaveBeenCalledTimes(1);

    // 再レンダリング
    rerender();

    // staleTimeが設定されているため、再度API呼び出しは行われない
    expect(departmentApi.fetchDepartments).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual(mockDepartments);
  });

  it("キャッシュが無効化された場合は再取得される", async () => {
    vi.mocked(departmentApi.fetchDepartments).mockResolvedValue(
      mockDepartments,
    );

    const { result } = renderHook(() => useDepartments(), {
      wrapper: createWrapper(queryClient),
    });

    // 初回データ取得完了まで待機
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(departmentApi.fetchDepartments).toHaveBeenCalledTimes(1);

    // キャッシュを手動で無効化
    await queryClient.invalidateQueries({ queryKey: ["departments"] });

    // 無効化後は再取得される
    await waitFor(() =>
      expect(departmentApi.fetchDepartments).toHaveBeenCalledTimes(2),
    );
  });

  it("複数のコンポーネントで同じデータを共有する", async () => {
    vi.mocked(departmentApi.fetchDepartments).mockResolvedValue(
      mockDepartments,
    );

    const wrapper = createWrapper(queryClient);

    // 複数のhookを同時にレンダリング
    const { result: result1 } = renderHook(() => useDepartments(), { wrapper });
    const { result: result2 } = renderHook(() => useDepartments(), { wrapper });

    // 両方のhookで同じデータを取得
    await waitFor(() => {
      expect(result1.current.isSuccess).toBe(true);
      expect(result2.current.isSuccess).toBe(true);
    });

    expect(result1.current.data).toEqual(mockDepartments);
    expect(result2.current.data).toEqual(mockDepartments);
    // APIは一度だけ呼ばれる（キャッシュが効いている）
    expect(departmentApi.fetchDepartments).toHaveBeenCalledTimes(1);
  });
});
