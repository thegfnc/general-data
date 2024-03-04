import {contextDocumentTypeName} from '@sanity/assist'
import {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) => {
  const GFNC_ListItem = S.listItem()
    .title('[GFNC] The Good for Nothings Club')
    .icon(() => '🤙')
    .child(S.list().title('GFNC Documents').items([]))

  const IIHD_countryList = S.documentTypeList('IIHD_country')
  const IIHD_administrativeAreaLevel1List = S.documentTypeList('IIHD_administrativeAreaLevel1')
  const IIHD_administrativeAreaLevel2List = S.documentTypeList('IIHD_administrativeAreaLevel2')
  const IIHD_localityList = S.documentTypeList('IIHD_locality')
  const IIHD_ListItem = S.listItem()
    .title('[IIHD] Is It Here? Data')
    .icon(() => '🌍')
    .child(
      S.list()
        .title('IIHD Documents')
        .items([
          S.listItem()
            .title(IIHD_countryList.getTitle() || '')
            .child(IIHD_countryList),
          S.listItem()
            .title(IIHD_administrativeAreaLevel1List.getTitle() || '')
            .child(IIHD_administrativeAreaLevel1List),
          S.listItem()
            .title(IIHD_administrativeAreaLevel2List.getTitle() || '')
            .child(IIHD_administrativeAreaLevel2List),
          S.listItem()
            .title(IIHD_localityList.getTitle() || '')
            .child(IIHD_localityList),
        ]),
    )

  return S.list()
    .title('Base')
    .items([
      S.listItem()
        .title('All Documents')
        .child(S.list().title('All Documents').items(S.documentTypeListItems())),
      S.divider(),
      GFNC_ListItem,
      IIHD_ListItem,
      S.divider(),
      S.documentTypeListItem(contextDocumentTypeName),
    ])
}
