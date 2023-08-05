import assert from 'assert'
import * as path from 'path'
import * as fs from 'fs-extra'
import { noop } from '../common/utils'
import * as fu from '../common/file-utils'
import { SaveType, IImageFile } from '../common/types'

export async function saveFiles(images: IImageFile[], type: SaveType, dirname?: string) {
  if (type === SaveType.NEW_DIR && !dirname) return

  for (const image of images) {
    if (!image) continue

    let savePath: string = fu.reext(image.originalName, image.ext)

    switch (type) {
      case SaveType.OVER:
        break

      case SaveType.NEW_NAME:
        savePath = await fu.unoccupiedFile(savePath)
        break

      case SaveType.NEW_DIR:
        assert(dirname)
        savePath = await fu.unoccupiedFile(path.resolve(dirname, path.basename(savePath)))
        break
      default:
    }

    await fs.copyFile(fu.getFilePath(image), savePath).catch(noop)
  }
}

export async function saveFile(image: IImageFile, filePath: string) {
  await fs.copyFile(fu.getFilePath(image), filePath)
}
