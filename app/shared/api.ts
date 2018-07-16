import gql from "graphql-tag";

export const getInspireProfile = gql`
    query getInspire {
        getInspire {
            code
            message
            inspire{
                id
                year
                month
                day
                fileName
                url
            }
        }
    }
`;

export const getAllahNameProfile = gql`
    query getAllahName($id:Int!){
        getAllahName(id:$id) {
            code
            message
            allahName{
                id
                name
                englishName
                chineseName
                englishMeaning
                chineseMeaning
                englishIntro
                chineseIntro
            }
        }
    }
`;

export const getSlideshowImagesProfile = gql`
    query getSlideshowImages($groupId:Int!) {
        getSlideshowImages(groupId: $groupId) {
            code
            message
            images{
                id
                fileName
                title
                link
                url
            }
        }
    }
`;

export const getAllahNamesProfile = gql`
    query getAllahNames($pageNumber: Int!, $pageSize: Int!){
        getAllahNames(pageNumber: $pageNumber, pageSize: $pageSize){
            code
            message
            allahNames{
                id
                name
                englishName
                chineseName
                englishMeaning
                chineseMeaning
                englishIntro
                chineseIntro
            }
        }
    }
`;

export const getInspiresProfile = gql`
    query getInspires{
        getInspires{
            code
            message
            inspires{
                id
                year
                month
                day
                fileName
                url
                isCollect
            }
        }
    }
`;

export const getHotQuranSectionsProfile = gql`
    query getHotQuranSections($chapterNo: Int!){
        getHotQuranSections(chapterNo: $chapterNo){
            code
            message
            sections{
                id
                no
                hot
                chapterNo
                englishContent
                arabicContent
            }
        }
    }
`;

export const getHotQuranChaptersProfile = gql`
    query getHotQuranChapters{
        getHotQuranChapters{
            code
            message
            chapters{
                id
                no
                chineseInfo{
                    id
                    title
                    alias
                    intro
                }
                englishInfo{
                    id
                    title
                    alias
                    intro
                }
            }
        }
    }
`;

export const getHajjUmrchsProfile = gql`
    query getHajjUmrchs{
        getHajjUmrchs{
            code
            message
            hajjUmrchs{
            id
            majorTitle
            minorTitle
            content
            }
        }
    }
`;

export const getKoranMenuChapter = gql`
query getQuranChapters($no :Int!){
    getQuranChapter(no: $no){
      chapter{
        id
        no
        setionsCount
        englishInfo{
            title
          	intro
          	alias
         	intro
        }
        chineseInfo{
          title
          id
          intro
          alias
        }
      }
    }
  }
`;
export const getKoranMenuChapters = gql`
query getQuranChapters($pageNumber :Int!, $pageSize: Int!){
    getQuranChapters(pageNumber: $pageNumber,pageSize: $pageSize ){
      chapters{
        id
        no
        sectionsCount
        englishInfo{
            title
          	intro
          	alias
         		intro
        }
        chineseInfo{
          title
          id
          intro
          alias
        }
        arabicInfo{
            title
          	intro
          	alias
         	intro
        }
      }
    }
  }
`;
export const getKoranSelections = gql`
query getQuranSections(
    $chapterNo: Int!,
    $pageNumber: Int!,
    $pageSize: Int!
      ){
   getQuranSections(
    chapterNo: $chapterNo,
    pageNumber: $pageNumber,
    pageSize: $pageSize,
  ){
    sections{
      id
      no
      isMark
      arabicContent
      englishContent
      chineseContent
      arabicAudioUrl
    	}
  	}
  }
`;
export const getKoranSelection = gql`
query getQuranSection(
    $chapterNo: Int!,
    $pageNumber: Int!,
      ){
   getQuranSection(
    chapterNo: $chapterNo,
    no: $pageNumber,
  ){
    section{
      id
      arabicContent
      englishContent
      chineseContent
      arabicAudioUrl
    	}
  	}
  }
`;

export const getHajjUmrchProfile = gql`
    query getHajjUmrch($id: Int!){
        getHajjUmrch(id: $id){
            code
            message
            hajjUmrch{
                id
                majorTitle
                minorTitle
                content
            }
        }
    }
`;

export const getHomePageChapterSection = gql`
    query getHomePageChapterSection($id: Int!){
        getHomePageChapterSection(id: $id){
            code
            message
            homePageChapterSection{
                id
                title
                chapterNo
                sectionNos
                chapter{
                    id
                    no
                    homePageImageUrl
                    homePageImageFileName
                    chineseInfo{
                        id
                        title
                        alias
                        intro
                    }
                    englishInfo{
                        id
                        title
                        alias
                        intro
                    }
                }
                sections{
                    id
                    no
                    chapterNo
                    chineseContent
                    englishContent
                    arabicContent
                }
            }
        }
    }
`;

export const addInspireCollection = gql`
    mutation addInspireCollection($id :Int!){
        addInspireCollection(id: $id){
            code
            message
        }
    }
`;

export const removeInspireCollection = gql`
    mutation removeInspireCollection($id :Int!){
        removeInspireCollection(id: $id){
            code
            message
        }
    }
`;
export const addKoranChapterToBookMark = gql`
mutation addBookMark($chapterNo: Int!, $no: Int!) {
    addBookMark(chapterNo: $chapterNo, no: $no){
       message
   }
 }
`;
export const removeKoranChapterToBookMark = gql`
mutation removeBookMark($chapterNo: Int!, $no: Int!) {
    removeBookMark(chapterNo: $chapterNo, no: $no){
       message
   }
 }
`;
export const bookMarks = gql`
query getBookMarks($pageSize: Int!, $pageNumber: Int!) {
    getBookMarks(pageSize: $pageSize, pageNumber:$pageNumber){
     sections{
       id
       chapterNo
       no
       arabicContent
       englishContent
       chineseContent
       arabicAudioUrl
         }
       }
   }`;
export const getKoranCapter = gql`
query getQuranChapter($no: Int!) {
    getQuranChapter(no: $no) {
      chapter{
        englishInfo{
          title
        }
      }
    }
  }`;
export const getQuranSectionsByNo = gql`
query getQuranSectionsByNo($chapterNo: Int!,$no: Int!, $limit: Int!){
    getQuranSectionsByNo(chapterNo: $chapterNo, no: $no, limit: $limit){
      sections{
       id
        no
        isMark
        arabicAudioUrl
        arabicContent
        englishContent
        chineseContent
      }
    }
  }`;

export const getHlc = gql`
query getHlc{
	getHlc{
    hlc{
      expire
      total
      random
    }
  }
}`;

export const addHlc = gql`
mutation addHlcRandom{
	addHlcRandom{
    random
    hlc{
      expire
      total
      random
    }
  }
}`;

export const savePushInfo = gql`
    mutation savePushInfo(
        $timeZone: Int!
        $longitude: String!
        $latitude: String!
        $token: String!
    ){
        savePushInfo(
            timeZone: $timeZone,
            longitude: $longitude,
            latitude: $latitude,
            token: $token
        ){
            code
            message
        }
    }
`;

export const getPrayer = gql`
    query getPrayer($date: InputDate){
        getPrayer(date:$date){
            code
            message
            prayer{
                date_for{
                    year
                    month
                    day
                }
                times{
                    type
                    time{
                        hour
                        minute
                    }
                    enable
                }
            }
        }
    }
`;

export const getSaying = gql`
    query getSaying($id: Int){
        getSaying(id:$id){
            code
            message
            saying{
                id
                name
                content
            }
        }
    }
`;

export const enablePush = gql`
    mutation enablePush($type: PrayerType){
        enablePush(
            type: $type
        ){
            code
            message
        }
    }
`;

export const disablePush = gql`
    mutation disablePush($type: PrayerType){
        disablePush(
            type: $type
        ){
            code
            message
        }
    }
`;

export const nearbySearch = gql`
    query nearbySearch(
        $latitude:Float!,
        $longitude:Float!,
        $radius:Int!
    ){
        nearbySearch(
            latitude: $latitude,
            longitude: $longitude,
            radius: $radius
        ){
            code
            message
            data{
                latitude
                longitude
                name
                photoUrl
                distance
            }
        }
    }
`;
