import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"], // ログ出力を有効化
});

async function main() {
  console.log("🔍 Prismaの基本操作をテストします\n");

  // 1. 全社員を取得（部署情報も含む）
  console.log("1️⃣ 全社員を取得:");
  const allEmployees = await prisma.employee.findMany({
    include: {
      department: true, // リレーションデータも取得
    },
    where: {
      isActive: true, // アクティブな社員のみ
    },
  });
  console.log(`アクティブな社員数: ${allEmployees.length}名`);
  console.log("最初の3名:");
  allEmployees.slice(0, 3).forEach((emp) => {
    console.log(
      `  - ${emp.lastName} ${emp.firstName} (${emp.department.name})`,
    );
  });

  // 2. 特定の部署の社員を取得
  console.log("\n2️⃣ 開発部の社員を取得:");
  const devEmployees = await prisma.employee.findMany({
    where: {
      department: {
        name: "開発部",
      },
    },
    select: {
      employeeId: true,
      lastName: true,
      firstName: true,
      position: true,
      salary: true,
    },
  });
  devEmployees.forEach((emp) => {
    console.log(
      `  - ${emp.employeeId}: ${emp.lastName} ${emp.firstName} (${emp.position})`,
    );
  });

  // 3. 集計クエリ
  console.log("\n3️⃣ 部署別の統計:");
  const departmentStats = await prisma.department.findMany({
    include: {
      _count: {
        select: { employees: true },
      },
      employees: {
        select: {
          salary: true,
        },
        where: {
          isActive: true,
        },
      },
    },
  });

  for (const dept of departmentStats) {
    const salaries = dept.employees
      .map((e) => (e.salary ? Number(e.salary) : 0))
      .filter((s) => s > 0);

    const avgSalary =
      salaries.length > 0
        ? salaries.reduce((a, b) => a + b, 0) / salaries.length
        : 0;

    console.log(`  ${dept.name}:`);
    console.log(`    - 社員数: ${dept._count.employees}名`);
    console.log(`    - 平均給与: ¥${avgSalary.toLocaleString()}`);
  }

  // 4. 検索クエリ（名前で検索）
  console.log('\n4️⃣ 名前で検索（"田"を含む）:');
  const searchResults = await prisma.employee.findMany({
    where: {
      OR: [{ lastName: { contains: "田" } }, { firstName: { contains: "田" } }],
    },
    select: {
      lastName: true,
      firstName: true,
      email: true,
    },
  });
  searchResults.forEach((emp) => {
    console.log(`  - ${emp.lastName} ${emp.firstName} (${emp.email})`);
  });

  // 5. ページネーション
  console.log("\n5️⃣ ページネーション（1ページ3件）:");
  const page1 = await prisma.employee.findMany({
    take: 3,
    skip: 0,
    orderBy: {
      employeeId: "asc",
    },
    select: {
      employeeId: true,
      lastName: true,
      firstName: true,
    },
  });
  console.log("  ページ1:");
  page1.forEach((emp) => {
    console.log(`    - ${emp.employeeId}: ${emp.lastName} ${emp.firstName}`);
  });

  // 6. トランザクション例
  console.log("\n6️⃣ トランザクション（部署の社員数をカウント）:");
  const [totalEmployees, totalDepartments, activeCount] =
    await prisma.$transaction([
      prisma.employee.count(),
      prisma.department.count(),
      prisma.employee.count({ where: { isActive: true } }),
    ]);
  console.log(`  - 全社員数: ${totalEmployees}名`);
  console.log(`  - 部署数: ${totalDepartments}`);
  console.log(`  - アクティブ社員: ${activeCount}名`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("\n✅ テスト完了！");
  })
  .catch(async (e) => {
    console.error("❌ エラー:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
