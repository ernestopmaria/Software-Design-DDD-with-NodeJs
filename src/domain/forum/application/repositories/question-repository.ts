import { Question } from '@/domain/enterprise/entities/question'

export interface QuestionRepository {
  findBySlug (slug:string):Promise<Question | null>
  create(question: Question): Promise<void>
}
