import { PrismaClient } from '../generated/prisma';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  // 사용자 생성
  const user1 = await prisma.user.create({
    data: {
      email: '김철수@example.com',
      nickName: '철수맨',
      name: '김철수',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: '이영희@example.com',
      nickName: '영희야',
      name: '이영희',
    },
  });

  const user3 = await prisma.user.create({
    data: {
      email: '박민수@example.com',
      nickName: '민수형',
      name: '박민수',
    },
  });

  // 목표 생성
  const goal1 = await prisma.goal.create({
    data: {
      content: '개발자로서 성장하기',
      authorId: user1.id,
    },
  });

  const goal2 = await prisma.goal.create({
    data: {
      content: '건강한 라이프스타일 만들기',
      authorId: user2.id,
    },
  });

  const goal3 = await prisma.goal.create({
    data: {
      content: '새로운 언어 배우기',
      authorId: user3.id,
    },
  });

  // 할일 생성
  const task1 = await prisma.task.create({
    data: {
      title: 'NestJS 프로젝트 설정 완료하기',
      content: 'Prisma와 PostgreSQL 연동하여 백엔드 환경 구축',
      completed: true,
      priority: 'HIGH',
      repeatDays: ['MON', 'TUE', 'WED', 'THU', 'FRI'],
      startDate: new Date('2024-08-01'),
      endDate: new Date('2024-08-15'),
      authorId: user1.id,
      goalId: goal1.id,
    },
  });

  const task2 = await prisma.task.create({
    data: {
      title: 'TypeScript 공부하기',
      content: '매일 1시간씩 TypeScript 문서 읽고 실습하기',
      completed: false,
      priority: 'MEDIUM',
      repeatDays: ['MON', 'WED', 'FRI'],
      startDate: new Date('2024-08-10'),
      endDate: new Date('2024-12-31'),
      authorId: user1.id,
      goalId: goal1.id,
    },
  });

  const task3 = await prisma.task.create({
    data: {
      title: '매일 아침 운동하기',
      content: '30분간 조깅 또는 홈트레이닝',
      completed: false,
      priority: 'HIGH',
      repeatDays: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
      startDate: new Date('2024-08-01'),
      endDate: new Date('2024-12-31'),
      authorId: user2.id,
      goalId: goal2.id,
    },
  });

  const task4 = await prisma.task.create({
    data: {
      title: '건강한 식단 유지하기',
      content: '야채와 과일 위주의 식단, 금주하기',
      completed: false,
      priority: 'MEDIUM',
      repeatDays: ['MON', 'TUE', 'WED', 'THU', 'FRI'],
      startDate: new Date('2024-08-05'),
      endDate: new Date('2024-11-30'),
      authorId: user2.id,
      goalId: goal2.id,
    },
  });

  const task5 = await prisma.task.create({
    data: {
      title: '스페인어 기초 문법 익히기',
      content: '듀오링고와 문법책으로 매일 30분씩 공부',
      completed: false,
      priority: 'LOW',
      repeatDays: ['MON', 'WED', 'FRI', 'SUN'],
      startDate: new Date('2024-08-01'),
      endDate: new Date('2024-10-31'),
      authorId: user3.id,
      goalId: goal3.id,
    },
  });

  // 메모 생성
  await prisma.memo.create({
    data: {
      taskId: task1.id,
      memoId: uuidv4(),
      content: '프로젝트 초기 설정 완료! Prisma 스키마 설계가 생각보다 복잡했지만 잘 해결했다.',
      authorId: user1.id,
      postId: uuidv4(),
    },
  });

  await prisma.memo.create({
    data: {
      taskId: task2.id,
      memoId: uuidv4(),
      content: '오늘은 제네릭에 대해 공부했다. 아직 완전히 이해가 안 되는 부분이 있어서 내일 더 봐야겠다.',
      authorId: user1.id,
      postId: uuidv4(),
    },
  });

  await prisma.memo.create({
    data: {
      taskId: task3.id,
      memoId: uuidv4(),
      content: '오늘 아침 조깅 30분! 처음엔 힘들었지만 점점 체력이 늘고 있는 것 같다.',
      authorId: user2.id,
      postId: uuidv4(),
    },
  });

  console.log('데이터베이스 시드 데이터 생성 완료!');
  console.log(`생성된 사용자: ${user1.name}, ${user2.name}, ${user3.name}`);
  console.log('생성된 목표: 3개');
  console.log('생성된 할일: 5개');
  console.log('생성된 메모: 3개');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
