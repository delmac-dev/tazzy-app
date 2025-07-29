import { ImageSourcePropType } from "react-native";

export const ONBOARDING_CONTENT = [
  {
    title: "Plan Smarter, Stress Less",
    body: "Create smart schedules and tasks that adapt as life changes",
    image: require("@/assets/onboarding/board1.png"),
  },
  {
    title: "Subscribe & Collaborate",
    body: "Collaborate on tasks with real-time syncing and shared reminders.",
    image: require("@/assets/onboarding/board1.png"),
  },
  {
    title: "AI-Powered Productivity",
    body: "AI extracts schedules from files and creates smart, auto-adjusting plans.",
    image: require("@/assets/onboarding/board1.png"),
  }
];

export const SCHEDULE_COLORS = [
  { name: "tangerine", color: { hex: "#E26B43", rgb: "226, 107, 67" } },
  { name: "banana", color: { hex: "#E7BA57", rgb: "231, 186, 87" } },
  { name: "sage", color: { hex: "#59AF80", rgb: "89, 175, 128" } },
  { name: "peacock", color: { hex: "#5398CF", rgb: "83, 152, 207" } },
  { name: "lavender", color: { hex: "#848BC1", rgb: "132, 139, 193" } },
  { name: "grape", color: { hex: "#AA61BB", rgb: "170, 97, 187" } },
  { name: "flamingo", color: { hex: "#D4847B", rgb: "212, 132, 123" } }
];

export const AVATARS: Record<string, ImageSourcePropType> = {
  avatar1: require('@/assets/avatars/blue_2.jpg'),
  avatar2: require('@/assets/avatars/blue.jpg'),
  avatar3: require('@/assets/avatars/brown_2.jpg'),
  avatar4: require('@/assets/avatars/brown.jpg'),
  avatar5: require('@/assets/avatars/green_2.jpg'),
  avatar6: require('@/assets/avatars/green.jpg'),
  avatar7: require('@/assets/avatars/orange_2.jpg'),
  avatar8: require('@/assets/avatars/orange.jpg'),
  avatar9: require('@/assets/avatars/pink_2.jpg'),
  avatar10: require('@/assets/avatars/pink.jpg'),
  avatar11: require('@/assets/avatars/red_2.jpg'),
  avatar12: require('@/assets/avatars/red.jpg'),
  avatar13: require('@/assets/avatars/violet_2.jpg'),
  avatar14: require('@/assets/avatars/violet.jpg'),
  avatar15: require('@/assets/avatars/yellow_2.jpg'),
  avatar16: require('@/assets/avatars/yellow.jpg'),
};

export const MOCK_NOTIFICATIONS = [
  {
    "id": "1f14b9f2-1e5a-4f2b-b0a2-123456789001",
    "type": "reminder",
    "title": "Upcoming Task Reminder",
    "body": "Your task \"Complete Lab Report\" starts in 30 minutes.",
    "date": "now"
  },
  {
    "id": "1f14b9f2-1e5a-4f2b-b0a2-123456789002",
    "type": "reminder",
    "title": "Don’t Miss Your Deadline",
    "body": "Reminder: \"Submit Assignment 2\" is due soon.",
    "date": "today"
  },
  {
    "id": "1f14b9f2-1e5a-4f2b-b0a2-123456789003",
    "type": "reminder",
    "title": "Prepare for Meeting",
    "body": "Your scheduled \"Project Discussion\" starts soon.",
    "date": "today"
  },
  {
    "id": "1f14b9f2-1e5a-4f2b-b0a2-123456789004",
    "type": "reminder",
    "title": "Review Lecture Notes",
    "body": "Don't forget to revise \"Circuit Theory Lecture\" before class.",
    "date": "yesterday"
  },
  {
    "id": "1f14b9f2-1e5a-4f2b-b0a2-123456789005",
    "type": "task_sync",
    "title": "Task Updated by Owner",
    "body": "The task \"Weekly Report\" you’re subscribed to was updated.",
    "date": "yesterday"
  },
  {
    "id": "1f14b9f2-1e5a-4f2b-b0a2-123456789006",
    "type": "task_sync",
    "title": "Task Deleted",
    "body": "An owner deleted \"Group Study Session\" you were following.",
    "date": "3 days ago"
  },
  {
    "id": "1f14b9f2-1e5a-4f2b-b0a2-123456789007",
    "type": "schedule_sync",
    "title": "Template Updated",
    "body": "An author made changes to \"Semester 1 Study Plan\" template.",
    "date": "3 days ago"
  },
  {
    "id": "1f14b9f2-1e5a-4f2b-b0a2-123456789008",
    "type": "schedule_sync",
    "title": "New Template Version Available",
    "body": "Check the new version of \"Lab Schedule Template\" you’re using.",
    "date": "last week"
  },
  {
    "id": "1f14b9f2-1e5a-4f2b-b0a2-123456789009",
    "type": "schedule_sync",
    "title": "Template Removed",
    "body": "A template you were subscribed to has been removed by its author.",
    "date": "last week"
  },
  {
    "id": "1f14b9f2-1e5a-4f2b-b0a2-123456789010",
    "type": "schedule_sync",
    "title": "Sync Needed",
    "body": "Updates detected in \"Exam Revision Plan\" — sync changes to stay up to date.",
    "date": "last week"
  }
];

export const MOCK_TASKS =  [
  { "id": "header-Today", "text": "Today", "type": "header" },
  { "id": "0-0", "text": "Plan activity 1 on Today", "type": "item" },
  { "id": "0-1", "text": "Plan activity 2 on Today", "type": "item" },
  { "id": "0-2", "text": "Plan activity 3 on Today", "type": "item" },
  { "id": "header-Jul 24, Thursday", "text": "Jul 24, Thursday", "type": "header" },
  { "id": "1-0", "text": "Plan activity 1 on Jul 24, Thursday", "type": "item" },
  { "id": "1-1", "text": "Plan activity 2 on Jul 24, Thursday", "type": "item" },
  { "id": "1-2", "text": "Plan activity 3 on Jul 24, Thursday", "type": "item" },
  { "id": "header-Jul 25, Friday", "text": "Jul 25, Friday", "type": "header" },
  { "id": "2-0", "text": "Plan activity 1 on Jul 25, Friday", "type": "item" },
  { "id": "2-1", "text": "Plan activity 2 on Jul 25, Friday", "type": "item" },
  { "id": "2-2", "text": "Plan activity 3 on Jul 25, Friday", "type": "item" },
  { "id": "header-Jul 26, Saturday", "text": "Jul 26, Saturday", "type": "header" },
  { "id": "3-0", "text": "Plan activity 1 on Jul 26, Saturday", "type": "item" },
  { "id": "3-1", "text": "Plan activity 2 on Jul 26, Saturday", "type": "item" },
  { "id": "3-2", "text": "Plan activity 3 on Jul 26, Saturday", "type": "item" },
  { "id": "header-Jul 27, Sunday", "text": "Jul 27, Sunday", "type": "header" },
  { "id": "4-0", "text": "Plan activity 1 on Jul 27, Sunday", "type": "item" },
  { "id": "4-1", "text": "Plan activity 2 on Jul 27, Sunday", "type": "item" },
  { "id": "4-2", "text": "Plan activity 3 on Jul 27, Sunday", "type": "item" }
];

export const MOCK_SCHEDULES = [
  {"name":"CE1: Semester 1","color":"blue","emoji":"📘"},
  {"name":"CE1: Exam Revision","color":"red","emoji":"📚"},
  {"name":"CE2: Semester 2","color":"green","emoji":"🧑‍💻"},
  {"name":"Lab Schedule","color":"yellow","emoji":"🔬"},
  {"name":"Final Year Project Plan","color":"orange","emoji":"📅"}
]
