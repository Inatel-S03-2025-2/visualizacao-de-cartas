import type { GetMoveResponse } from "@/services/responses/get-move-response";
import type { Move } from "@/types/move";

export class MoveFactory {
  static fromApiResponse(res: GetMoveResponse): Move {
    return res as Move;
  }
}
