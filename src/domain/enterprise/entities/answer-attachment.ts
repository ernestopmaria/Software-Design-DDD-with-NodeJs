import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

interface AnswerAttachmentProps {
  AnswerId: UniqueEntityID
  attachmentId: UniqueEntityID
}


export class AnswerAttachment extends Entity<AnswerAttachmentProps>{


  get AnswerId() {
    return this.props.AnswerId
  }

  get attachmentId() {
    return this.props.attachmentId
  }

  static create(props: AnswerAttachment, id?: UniqueEntityID) {
    const answerAttachment = new AnswerAttachment(props, id)
    return answerAttachment
  }

}