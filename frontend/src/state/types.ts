export interface Country {
  name: string;
  url: string;
}

export interface QuestionsResponse {
  blooms_level: string;
  difficulty_level: string;
  id: string;
  options: any;
  question: string;
  total_points: number;
  type: string;
}

export interface LeaderBoardResponse {
  date: string;
  _id: string;
  img: string;
  location: string;
  name: string;
  score: number;
}

export interface FlashCardResponse {
  id: number;
  question: string;
  answer: string;
  option: Array<string>;
}

export interface wordResponse {
  translation: string;
  word: string;
  id: string;
  difficulty_level: string;
  blooms_level: string;
  total_points: number;
  romanization: string;
}

export interface NewFlashCardResponse {
  _id: string;
  lng: string;
  flag: string;
  voice: string;
  words: Array<wordResponse>;
}


export interface UserTestDetail {
  userId: number
  testId: number
  status: string
  totalPoints: number
  gainedPoints: number
  totalQuestions: number
  questionAttempted: number
  currentItem: any
  testItems: any
  currentIndex: any
  userTestItemResponses: UserTestItemResponses
  updated_at: string

}

export interface UserTestItemResponses {
  userId: number
  testId: number
  testItemId: string
  status: string
  totalPoints: number
  gainedPoints: number
  answer: any
  content: string
  difficultyLevel: string
  bloomsLevel: string
  type: string
  isCorrect: boolean
  updated_at: string
}
