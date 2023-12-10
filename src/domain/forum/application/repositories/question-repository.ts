import { Question } from '@/domain/enterprise/entities/question'

export interface QuestionRepository {
  create(question: Question): Promise<void>
}
