import { QuestionAttachment } from "@/domain/enterprise/entities/question-attachment";

export interface QuestionAttachmentsRepository {
  findManByQuestionId(questionId: string):Promise<QuestionAttachment[]>
 
}


