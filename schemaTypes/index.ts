import GFNC_member from './GFNC/member'
import GFNC_project from './GFNC/project'

import IIHD_administrativeAreaLevel1 from './IIHD/administrativeAreaLevel1'
import IIHD_administrativeAreaLevel2 from './IIHD/administrativeAreaLevel2'
import IIHD_country from './IIHD/country'
import IIHD_locality from './IIHD/locality'

import youTubeType from './youTubeType'

export const schemaTypes = [
  GFNC_member,
  GFNC_project,

  IIHD_country,
  IIHD_administrativeAreaLevel1,
  IIHD_administrativeAreaLevel2,
  IIHD_locality,

  youTubeType,
]
