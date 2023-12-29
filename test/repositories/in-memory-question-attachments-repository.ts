import { QuestionAttachment } from "@/domain/enterprise/entities/question-attachment";
import { QuestionAttachmentsRepository } from "@/domain/forum/application/repositories/question-attachments-repository";

export class InMemoryQuestionAttachmentsRepository implements QuestionAttachmentsRepository {
  public items: QuestionAttachment[] = []

  async findManyByQuestionId(questionId: string) {
    const questionAttachments = this.items.filter(item => item.id.toString() === questionId)
    return questionAttachments
  }




}