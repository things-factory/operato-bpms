import { MigrationInterface, QueryRunner, getRepository } from 'typeorm'

import { Domain } from '@things-factory/shell'

import { ProcessGroup } from '@things-factory/process-service'

const SEED_PROCESS_GROUP = [
  {
    id: 'fffe0fb6-90ed-4405-ae5a-43e0ee7e12ed',
    name: 'MEGA',
    description: 'Mega Process'
  },
  {
    id: 'dbb0f731-dd06-4e70-8e7d-742adbfac5ef',
    name: 'PICK&PLACE',
    description: 'Robot Pick&Place Process'
  },
  {
    id: '10667d11-9b95-47c9-bd0f-788cd161c9a6',
    name: 'AGV',
    description: 'AGV Process'
  }
]

export class TestProcessGroup1566025179899 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(ProcessGroup)
    const domainRepository = getRepository(Domain)
    const domain = await domainRepository.findOne({ name: 'SYSTEM' })

    try {
      SEED_PROCESS_GROUP.forEach(async group => {
        await repository.save({
          ...group,
          domain
        })
      })
    } catch (e) {
      console.error(e)
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(ProcessGroup)

    SEED_PROCESS_GROUP.reverse().forEach(async group => {
      let record = await repository.findOne({ name: group.name })
      await repository.remove(record)
    })
  }
}
