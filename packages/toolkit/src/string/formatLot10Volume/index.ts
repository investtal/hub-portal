import type { EntityId, NullList, UnDef } from "@investtal/types"
import { isNumber } from "../../predicate/isNumber"

/**
 *
 * @param volume
 * @param precision
 * @param defaultValue
 * @returns
 */
// @__NO_SIDE_EFFECTS__
export function formatLot10Volume(
  volume: NullList<EntityId>,
  precision = 0,
  defaultValue: UnDef<EntityId> = "-",
): EntityId {
  if (!isNumber(volume)) {
    return defaultValue
  }
  return (volume * 10)?.toLocaleString("en", { minimumFractionDigits: precision }).slice(0, -1)
}
