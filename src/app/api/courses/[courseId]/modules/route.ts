import { CreateContentModulePayload } from "@/models/content.model"
import { getContentItemsByModuleIds } from "@/server/services/content-item.service"
import {
  createContentModule,
  getContentModulesByCourseId,
} from "@/server/services/module.service"
import {
  failure,
  getUserId,
  success,
  toJson,
  unauthorized,
} from "@/server/services/request.service"
import { NextRequest } from "next/server"

export const POST = async (req: NextRequest) => {
  const body = await toJson<CreateContentModulePayload>(req)
  const userId = getUserId(req)
  if (!userId) return unauthorized()
  const contentModule = await createContentModule(body, userId)
  return success(contentModule)
}

export const GET = async (req: NextRequest) => {
  const courseId = req.nextUrl.pathname.split("/")[3]
  if (!courseId) return failure("Missing course id")
  const contentModules = await getContentModulesByCourseId(courseId + "")
  const contentItems = await getContentItemsByModuleIds(
    contentModules.map((m) => m.id)
  )

  contentModules.forEach((m) => {
    m.children = contentItems.filter((i) => i.contentModuleId === m.id)
  })

  return success(contentModules)
}