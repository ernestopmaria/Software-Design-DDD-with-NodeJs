import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { InMemoryNotificationRepository } from "test/repositories/in-memory-notification-repository"
import { SendNotificationUseCase } from "./send-notification"


      

let inMemoryNotificationRepository: InMemoryNotificationRepository
let sut: SendNotificationUseCase

describe('Create a notification', () => {
  beforeEach(async () => {
       

    inMemoryNotificationRepository = new InMemoryNotificationRepository(),
      sut = new SendNotificationUseCase(inMemoryNotificationRepository)
  })
  it('it should be able to create a notification', async () => {
 
    const result = await sut.execute({
      title: 'Melhor pais',
      recipientId: '1',
      content: 'Qual e o melhor pais para se viver?', 
    })
    expect(result.isRight()).toBe(true)
    expect(inMemoryNotificationRepository.items[0]).toEqual(result.value?.notification)

  })
})
