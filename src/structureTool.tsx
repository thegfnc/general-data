import { contextDocumentTypeName } from '@sanity/assist'
import { CalendarIcon } from '@sanity/icons'
import { DefaultDocumentNodeResolver, StructureResolver } from 'sanity/structure'
import DocumentsPane from '../plugins/documentsPane'
import ReferencedBy from '../plugins/referencedBy'

export const GFNC_icon = <img src="/static/GFNC_icon.png" alt="GFNC" />
export const IIHD_icon = <img src="/static/IIHD_icon.png" alt="IIHD" />

export const structure: StructureResolver = (S) => {
  const GFNC_ListItem = S.listItem()
    .title('The Good for Nothings Club [GFNC]')
    .icon(() => GFNC_icon)
    .child(S.list().title('GFNC Documents').items([]))

  const IIHD_countryList = S.documentTypeList('IIHD_country')
  const IIHD_administrativeAreaLevel1List = S.documentTypeList('IIHD_administrativeAreaLevel1')
  const IIHD_administrativeAreaLevel2List = S.documentTypeList('IIHD_administrativeAreaLevel2')
  const IIHD_localityList = S.documentTypeList('IIHD_locality')

  const IIHD_ListItem = S.listItem()
    .title('Is It Here? Data [IIHD]')
    .icon(() => IIHD_icon)
    .child(
      S.list()
        .title('IIHD Documents')
        .items([
          S.listItem()
            .icon(() => IIHD_icon)
            .title(IIHD_countryList.getTitle() || '')
            .child(IIHD_countryList),
          S.divider(),
          S.listItem()
            .icon(() => <CalendarIcon />)
            .title('Countries updated in last 7 days')
            .child(
              IIHD_countryList.filter('_type == "IIHD_country" && _updatedAt > $date').params({
                date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
              }),
            ),
          S.listItem()
            .icon(() => <CalendarIcon />)
            .title('AAL1s updated in last 7 days')
            .child(
              IIHD_administrativeAreaLevel1List.filter(
                '_type == "IIHD_administrativeAreaLevel1" && _updatedAt > $date',
              ).params({
                date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
              }),
            ),
          S.listItem()
            .icon(() => <CalendarIcon />)
            .title('AAL2s updated in last 7 days')
            .child(
              IIHD_administrativeAreaLevel2List.filter(
                '_type == "IIHD_administrativeAreaLevel2" && _updatedAt > $date',
              ).params({
                date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
              }),
            ),
          S.listItem()
            .icon(() => <CalendarIcon />)
            .title('Localities updated in last 7 days')
            .child(
              IIHD_localityList.filter('_type == "IIHD_locality" && _updatedAt > $date').params({
                date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
              }),
            ),
        ]),
    )

  return S.list()
    .title('Projects')
    .items([
      S.listItem()
        .title('All Documents')
        .child(S.list().title('All Documents').items(S.documentTypeListItems())),
      S.documentTypeListItem(contextDocumentTypeName),
      S.divider(),
      GFNC_ListItem,
      IIHD_ListItem,
    ])
}

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S) => {
  return S.document().views([S.view.form(), S.view.component(ReferencedBy).title('Referenced By')])
}
