import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 シードデータの投入を開始...");

  // 既存データをクリア
  await prisma.employee.deleteMany();
  await prisma.department.deleteMany();

  // 部署データの作成
  const departments = await Promise.all([
    prisma.department.create({
      data: {
        name: "営業部",
        description: "顧客への製品・サービスの販売を担当",
      },
    }),
    prisma.department.create({
      data: {
        name: "開発部",
        description: "ソフトウェア開発・保守を担当",
      },
    }),
    prisma.department.create({
      data: {
        name: "人事部",
        description: "採用・教育・労務管理を担当",
      },
    }),
    prisma.department.create({
      data: {
        name: "経理部",
        description: "財務・会計業務を担当",
      },
    }),
  ]);

  console.log(`✅ ${departments.length}件の部署を作成しました`);

  // 社員データの作成
  const employees = await Promise.all([
    // 営業部
    prisma.employee.create({
      data: {
        employeeId: "EMP000001",
        firstName: "太郎",
        lastName: "山田",
        email: "yamada.taro@example.com",
        phoneNumber: "09012345678",
        position: "営業部長",
        salary: 8000000,
        hireDate: new Date("2015-04-01"),
        departmentId: departments[0].id,
      },
    }),
    prisma.employee.create({
      data: {
        employeeId: "EMP000002",
        firstName: "花子",
        lastName: "佐藤",
        email: "sato.hanako@example.com",
        phoneNumber: "09023456789",
        position: "営業主任",
        salary: 5500000,
        hireDate: new Date("2018-04-01"),
        departmentId: departments[0].id,
      },
    }),
    // 開発部
    prisma.employee.create({
      data: {
        employeeId: "EMP000003",
        firstName: "次郎",
        lastName: "鈴木",
        email: "suzuki.jiro@example.com",
        phoneNumber: "09034567890",
        position: "テックリード",
        salary: 7500000,
        hireDate: new Date("2016-10-01"),
        departmentId: departments[1].id,
      },
    }),
    prisma.employee.create({
      data: {
        employeeId: "EMP000004",
        firstName: "美咲",
        lastName: "田中",
        email: "tanaka.misaki@example.com",
        phoneNumber: "09045678901",
        position: "シニアエンジニア",
        salary: 6500000,
        hireDate: new Date("2019-04-01"),
        departmentId: departments[1].id,
      },
    }),
    prisma.employee.create({
      data: {
        employeeId: "EMP000005",
        firstName: "健太",
        lastName: "渡辺",
        email: "watanabe.kenta@example.com",
        position: "ジュニアエンジニア",
        salary: 4000000,
        hireDate: new Date("2022-04-01"),
        departmentId: departments[1].id,
      },
    }),
    // 人事部
    prisma.employee.create({
      data: {
        employeeId: "EMP000006",
        firstName: "由美",
        lastName: "伊藤",
        email: "ito.yumi@example.com",
        phoneNumber: "09056789012",
        position: "人事部長",
        salary: 7000000,
        hireDate: new Date("2017-04-01"),
        departmentId: departments[2].id,
      },
    }),
    prisma.employee.create({
      data: {
        employeeId: "EMP000007",
        firstName: "大輔",
        lastName: "高橋",
        email: "takahashi.daisuke@example.com",
        position: "採用担当",
        salary: 4500000,
        hireDate: new Date("2020-04-01"),
        departmentId: departments[2].id,
      },
    }),
    // 経理部
    prisma.employee.create({
      data: {
        employeeId: "EMP000008",
        firstName: "真理子",
        lastName: "小林",
        email: "kobayashi.mariko@example.com",
        phoneNumber: "09067890123",
        position: "経理部長",
        salary: 7200000,
        hireDate: new Date("2016-04-01"),
        departmentId: departments[3].id,
      },
    }),
    prisma.employee.create({
      data: {
        employeeId: "EMP000009",
        firstName: "翔太",
        lastName: "加藤",
        email: "kato.shota@example.com",
        position: "経理担当",
        salary: 4200000,
        hireDate: new Date("2021-04-01"),
        departmentId: departments[3].id,
      },
    }),
    // 非アクティブな社員
    prisma.employee.create({
      data: {
        employeeId: "EMP000010",
        firstName: "隆",
        lastName: "吉田",
        email: "yoshida.takashi@example.com",
        position: "元営業担当",
        salary: 4000000,
        hireDate: new Date("2019-04-01"),
        departmentId: departments[0].id,
        isActive: false, // 退職済み
      },
    }),
  ]);

  console.log(`✅ ${employees.length}件の社員データを作成しました`);

  // 統計情報の表示
  const departmentStats = await prisma.department.findMany({
    include: {
      _count: {
        select: { employees: true },
      },
    },
  });

  console.log("\n📊 部署別社員数:");
  departmentStats.forEach((dept) => {
    console.log(`  ${dept.name}: ${dept._count.employees}名`);
  });

  const activeEmployees = await prisma.employee.count({
    where: { isActive: true },
  });
  console.log(`\n👥 在籍社員数: ${activeEmployees}名`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("\n✨ シードデータの投入が完了しました！");
  })
  .catch(async (e) => {
    console.error("❌ エラーが発生しました:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
