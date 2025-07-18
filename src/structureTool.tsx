import { contextDocumentTypeName } from '@sanity/assist'
import { CalendarIcon } from '@sanity/icons'
import type { DefaultDocumentNodeResolver, StructureResolver } from 'sanity/structure'
import ReferencedBy from '../plugins/referencedBy'

export const GFNC_icon = <img src="/static/GFNC_icon.png" alt="GFNC" />
export const IIHD_icon = <img src="/static/IIHD_icon.png" alt="IIHD" />
export const DIMR_icon = <img src="/static/DIMR_icon.png" alt="DIMR" />

export const structure: StructureResolver = (S) => {
  const GFNC_memberList = S.documentTypeList('GFNC_member').apiVersion('v2025-07-11')
  const GFNC_projectList = S.documentTypeList('GFNC_project').apiVersion('v2025-07-11')

  const GFNC_ListItem = S.listItem()
    .title('The Good for Nothings Club [GFNC]')
    .icon(() => GFNC_icon)
    .child(
      S.list()
        .title('GFNC Documents')
        .items([
          S.listItem()
            .icon(() => GFNC_icon)
            .title(GFNC_memberList.getTitle() || '')
            .child(GFNC_memberList),
          S.listItem()
            .icon(() => GFNC_icon)
            .title(GFNC_projectList.getTitle() || '')
            .child(GFNC_projectList),
        ]),
    )

  const IIHD_countryList = S.documentTypeList('IIHD_country').apiVersion('v2025-07-11')
  const IIHD_administrativeAreaLevel1List = S.documentTypeList(
    'IIHD_administrativeAreaLevel1',
  ).apiVersion('v2025-07-11')
  const IIHD_administrativeAreaLevel2List = S.documentTypeList(
    'IIHD_administrativeAreaLevel2',
  ).apiVersion('v2025-07-11')
  const IIHD_localityList = S.documentTypeList('IIHD_locality').apiVersion('v2025-07-11')

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

  const RSID_prompt = S.documentTypeList('RSID_prompt').apiVersion('v2025-07-11')

  const RSID_ListItem = S.listItem()
    .title('Renters Sidekick [RSID]')
    .icon(() => <img src="/static/GFNC_icon.png" alt="RSID" />)
    .child(RSID_prompt)

  const DIMR_blogPostList = S.documentTypeList('DIMR_blogPost').apiVersion('v2025-07-11')
  const DIMR_authorList = S.documentTypeList('DIMR_author').apiVersion('v2025-07-11')

  const DIMR_ListItem = S.listItem()
    .title('Ditch My Rent [DIMR]')
    .icon(() => DIMR_icon)
    .child(
      S.list()
        .title('DIMR Documents')
        .items([
          S.listItem()
            .icon(() => DIMR_icon)
            .title(DIMR_blogPostList.getTitle() || '')
            .child(DIMR_blogPostList),
          S.listItem()
            .icon(() => DIMR_icon)
            .title(DIMR_authorList.getTitle() || '')
            .child(DIMR_authorList),
        ]),
    )

  const NINE_creditList = S.documentTypeList('NINE_credit').apiVersion('v2025-07-11')
  const NINE_equipmentList = S.documentTypeList('NINE_equipment').apiVersion('v2025-07-11')
  const NINE_memberList = S.documentTypeList('NINE_member').apiVersion('v2025-07-11')
  const NINE_sessionList = S.documentTypeList('NINE_session').apiVersion('v2025-07-11')
  const NINE_songList = S.documentTypeList('NINE_song').apiVersion('v2025-07-11')
  const NINE_videoList = S.documentTypeList('NINE_video').apiVersion('v2025-07-11')

  const NINE_ListItem = S.listItem()
    .title('9 Point Studios [NINE]')
    .icon(() => GFNC_icon)
    .child(
      S.list()
        .title('NINE Documents')
        .items([
          S.listItem()
            .icon(() => GFNC_icon)
            .title(NINE_creditList.getTitle() || '')
            .child(NINE_creditList),
          S.listItem()
            .icon(() => GFNC_icon)
            .title(NINE_equipmentList.getTitle() || '')
            .child(NINE_equipmentList),
          S.listItem()
            .icon(() => GFNC_icon)
            .title(NINE_memberList.getTitle() || '')
            .child(NINE_memberList),
          S.listItem()
            .icon(() => GFNC_icon)
            .title(NINE_sessionList.getTitle() || '')
            .child(NINE_sessionList),
          S.listItem()
            .icon(() => GFNC_icon)
            .title(NINE_songList.getTitle() || '')
            .child(NINE_songList),
          S.listItem()
            .icon(() => GFNC_icon)
            .title(NINE_videoList.getTitle() || '')
            .child(NINE_videoList),
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
      NINE_ListItem,
      S.divider(),
      RSID_ListItem,
      IIHD_ListItem,
      DIMR_ListItem,
    ])
}

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S) => {
  return S.document().views([S.view.form(), S.view.component(ReferencedBy).title('Referenced By')])
}
