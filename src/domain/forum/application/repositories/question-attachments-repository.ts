import { QuestionAttachment } from "@/domain/enterprise/entities/question-attachment";

export interface QuestionAttachmentsRepository {
  findManyByQuestionId(questionId: string):Promise<QuestionAttachment[]>
 
}

