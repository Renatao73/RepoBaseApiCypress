let lmsId = null;
let LmsIdDuplicate = null;
let lmsIdCourse = null;
let lmsIdCourseNew = null;
let lmsIdCourseNewDuplicate = null
let lmsSectionsId = null
let lmsLessons = null
let lmsContents = null
let lmsIdUploadAudio = null
let lmsIdUploadPdf = null
let lmsIdUploadImage = null
let lmsIdUploadVideo = null
let lmsIdCategories = null   
let lmsIdClasses = null
let lmsIdClassesUsers = null
let lmsIdClassesUsersToken = null
let lmsIdClassesIdSwap = null


function setLmsIDClassesIdSwap(valor) {
    lmsIdClassesIdSwap = valor;
}

function setLmsIDClassesUsersToken(valor) {
    lmsIdClassesUsersToken = valor;
}

function setLmsIDClassesUsers(valor) {
    lmsIdClassesUsers = valor;
}
function setLmsIDClasses(valor) {
    lmsIdClasses = valor;
}

function setLmsIDCategories(valor) {
    lmsIdCategories = valor;
}

function setLmsIDUploadVideo(valor) {
    lmsIdUploadVideo = valor;
}

function setLmsIDUploadImage(valor) {
    lmsIdUploadImage = valor;
}

function setLmsIDUploadAudio(valor) {
    lmsIdUploadAudio = valor;
}


function setLmsIDUploadPdf(valor) {
    lmsIdUploadPdf = valor;
}

function setLmsIDContents(valor) {
    lmsContents = valor;
}


function setLmsIDLessons(valor) {
    lmsLessons = valor;
}

function setLmsIDDuplicate(valor) {
    LmsIdDuplicate = valor;
}

function setLmsID(valor) {
    lmsId = valor;
}

function setLmsIDNew(valor) {
    lmsIdCourseNew = valor;
}

function setLmsIDSections(valor) {
    lmsSectionsId = valor;
}

function getLmsIdContents() {
    return lmsContents;
}

function getLmsIdNew() {
    return lmsIdCourseNew;
}


function setLmsIDCourse(valor) {
    lmsIdCourse = valor;
}


function setLmsIDCourseDuplicate(valor) {
    lmsIdCourseNewDuplicate = valor;
}


function getLmsId() {
    return lmsId;
}

function getLmsIdCourseIDNewDuplicate() {
    return lmsId;
}


function getLmsIdLessons() {
    return lmsLessons;
}

function getLmsIdDuplicate() {
    return LmsIdDuplicate;
}
function getLmsIdCourse() {
    return lmsIdCourse;
}

function getLmsIdCourseIDNew() {
    return lmsIdCourseNew;
}

function getLmsIdCourseIDDuplicate() {
    return lmsIdCourseNewDuplicate;
 }

 function getLmsIdSections() {
    return lmsSectionsId;
 }


 function getLmsIdUploadAudio() {
    return lmsIdUploadAudio;
 }

 function getLmsIdUploadPdf() {
    return lmsIdUploadPdf;
 }

 function getLmsIdUploadImage() {
    return lmsIdUploadImage;
 }

 function getLmsIdUploadVideo() {
    return lmsIdUploadVideo;
 }

 function getLmsIdCategories() {
    return lmsIdCategories;
 }
 
 function getLmsIdClasses() {
    return lmsIdClasses;
 }

 function getLmsIdClassesUsers() {
    return lmsIdClassesUsers;
 }

 function getLmsIdClassesUsersToken() {
    return "Bearer " + lmsIdClassesUsersToken;
 }

 function getLmsIdClassesIdSwap() {
    return  lmsIdClassesIdSwap;
 }

export { setLmsID,setLmsIDDuplicate,setLmsIDCourse,setLmsIDClassesUsers,setLmsIDClassesIdSwap,
    setLmsIDCourseDuplicate,setLmsIDSections,setLmsIDLessons,setLmsIDContents,setLmsIDUploadAudio,
    setLmsIDUploadPdf,setLmsIDUploadImage,setLmsIDUploadVideo,setLmsIDCategories, setLmsIDClasses, setLmsIDClassesUsersToken,

    getLmsIdCourseIDDuplicate,getLmsIdSections,getLmsIdUploadAudio,getLmsIdClassesUsers , getLmsIdUploadPdf,getLmsIdCategories,
         setLmsIDNew, getLmsId, getLmsIdDuplicate , getLmsIdLessons,getLmsIdContents,getLmsIdClasses,getLmsIdClassesIdSwap,
         getLmsIdCourse,getLmsIdCourseIDNew, getLmsIdNew, getLmsIdUploadImage, getLmsIdUploadVideo, getLmsIdClassesUsersToken};