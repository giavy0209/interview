import { Injectable, Scope } from '@nestjs/common';
import { FindServerDto, SERVER_STATUS, SORT } from './dto/find-server.dto';

@Injectable({ scope: Scope.DEFAULT })
export class AppService {
  servers = [
    {
      "url": "https://does-not-work.perfume.new",
      "priority": 1
    },
    {
      "url": "https://gitlab.com",
      "priority": 4
    },
    {
      "url": "http://app.scnt.me",
      "priority": 3
    },
    {
      "url": "https://offline.scentronix.com",
      "priority": 2
    }
  ]

  async findServer({ status, sort }: FindServerDto, { skip, limit }: QueryOptions) {
    const serversStatus = await Promise.all(
      this.servers.map(async (server) => {
        try {
          const response = await fetch(server.url)
          return {
            status: SERVER_STATUS.AVAILABLE,
            ...server
          }
        } catch (error) {
          return {
            status: SERVER_STATUS.UN_AVAILABLE,
            ...server
          }
        }
      })
    )

    const data: { status: SERVER_STATUS, url: string, priority: number }[] = []
    if (status) {
      serversStatus.forEach(serverStatus => {
        if (status.includes(SERVER_STATUS.AVAILABLE) && serverStatus.status === SERVER_STATUS.AVAILABLE) {
          data.push(serverStatus)
        }
        if (status.includes(SERVER_STATUS.UN_AVAILABLE) && serverStatus.status === SERVER_STATUS.UN_AVAILABLE) {
          data.push(serverStatus)
        }
      })
    } else {
      data.push(...serversStatus)
    }
    let sortConstant = 1
    if (sort) {
      switch (sort) {
        case SORT.ASC:
          sortConstant = 1
          break;
        case SORT.DESC:
          sortConstant = -1
          break;
        default:
          break;
      }
    }

    data.sort((a, b) => (a.priority - b.priority) * sortConstant)

    return data.slice(skip, limit)
  }
}
