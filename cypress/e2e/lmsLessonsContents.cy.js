
import { getToken, getUrlApi, getTokenIvanlido } from '../support/helper';
import {
    setLmsID, setLmsIDDuplicate, setLmsIDCourse, setLmsIDNew, setLmsIDCourseDuplicate, setLmsIDLessons
    , getLmsId, getLmsIdSections, setLmsIDSections, setLmsIDContents, setLmsIDUploadAudio, setLmsIDUploadPdf, setLmsIDUploadImage,
    setLmsIDUploadVideo,

    getLmsIdCourseIDNew, getLmsIdDuplicate, getLmsIdCourse, getLmsIdLessons, getLmsIdContents,
    getLmsIdCourseIDDuplicate, getLmsIdNew, getLmsIdUploadAudio, getLmsIdUploadPdf, getLmsIdUploadImage, getLmsIdUploadVideo
} from '../support/variables/lms';

let fileNameAudio = "mp3.mp3"
let mimeTypeAudio = "audio/mpeg";
let fileNamePDf = "pdf.pdf"
let mimeTypePdf = "application/pdf";
let mimeTypeImage = "image/jpeg";
let fileNameImage = "jpg.jpg"
let mimeTypeVideo = "video/mp4";
let fileNameVideo = "mp4.mp4"

let folder = "../support/arquivos/";
let file;
let filePathAudio = folder + fileNameAudio;
let filePathPdf = folder + fileNamePDf;
let filePathImage = folder + fileNameImage;
let filePathVideo = folder + fileNameVideo;

describe('Validando Lessons', function () {

    ///////////////////////////////// GERANDO ARQUIVOS DE AUDIO, PDF, VIDEO , PNG,JPG ///////////////////////////////////////////////
    it('Gerando Arquivo de audio', () => {
        cy.fixture(filePathAudio, 'binary').then(variavel => {
            file = Cypress.Blob.binaryStringToBlob(variavel, mimeTypeAudio);
        })
    })

    it('Enviando arquivo de audio', () => {
        const formData = new FormData();
        formData.append('file', file, fileNameAudio);
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/lms/files/upload`,
            body: formData,
            headers: {
                Authorization: getToken(),
                'Content-Type': 'multipart/form-data',
                'Accept': "application/json",
            },
        }).then((response) => {
            const bodyString = Cypress.Blob.arrayBufferToBinaryString(response.body);
            const body = JSON.parse(bodyString);
            setLmsIDUploadAudio(body.data.file.id)
        })
    })

    it('Gerando Arquivo de pdf', () => {
        cy.fixture(filePathPdf, 'binary').then(variavel => {
            file = Cypress.Blob.binaryStringToBlob(variavel, mimeTypePdf);
        })
    })

    it('Enviando arquivo de pdf', () => {
        const formData = new FormData();
        formData.append('file', file, fileNamePDf);
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/lms/files/upload`,
            body: formData,
            headers: {
                Authorization: getToken(),
                'Content-Type': 'multipart/form-data',
                'Accept': "application/json",
            },
        }).then((response) => {
            const bodyString = Cypress.Blob.arrayBufferToBinaryString(response.body);
            const body = JSON.parse(bodyString);
            setLmsIDUploadPdf(body.data.file.id)
        })
    })

    it('Gerando Arquivo de image', () => {
        cy.fixture(filePathImage, 'binary').then(variavel => {
            file = Cypress.Blob.binaryStringToBlob(variavel, mimeTypeImage);
        })
    })

    it('Enviando arquivo de image', () => {
        const formData = new FormData();
        formData.append('file', file, fileNameImage);
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/lms/files/upload`,
            body: formData,
            headers: {
                Authorization: getToken(),
                'Content-Type': 'multipart/form-data',
                'Accept': "application/json",
            },
        }).then((response) => {
            const bodyString = Cypress.Blob.arrayBufferToBinaryString(response.body);
            const body = JSON.parse(bodyString);
            console.log(body.data.file.id)
            setLmsIDUploadImage(body.data.file.id)
        })
    })

    it('Gerando Arquivo de video', () => {
        cy.fixture(filePathVideo, 'binary').then(variavel => {
            file = Cypress.Blob.binaryStringToBlob(variavel, mimeTypeVideo);
        })
    })

    it('Enviando arquivo de video', () => {
        const formData = new FormData();
        formData.append('file', file, fileNameVideo);
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/lms/files/upload`,
            body: formData,
            headers: {
                Authorization: getToken(),
                'Content-Type': 'multipart/form-data',
                'Accept': "application/json",
            },
        }).then((response) => {
            const bodyString = Cypress.Blob.arrayBufferToBinaryString(response.body);
            const body = JSON.parse(bodyString);
            console.log(body.data.file.id)
            setLmsIDUploadVideo(body.data.file.id)
        })
    })

    //////////////////////////////////////////////////////// CENARIOS POSITIVOS /////////////////////////////////////////////////////////////////////////////////////
    it('criando Lms para criar lessons contents ', () => {
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/lms/create`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "title": "Anhanguera Interlagos"
            }
        }).then((response) => {
            setLmsIDCourse(response.body?.data?.lms?.id)
            expect(response.status).to.eq(200);
            expect(response.body.data.lms.created_at).not.be.empty;
            expect(response.body.data.lms.id).not.be.null;
            expect(response.body.data.lms.slug).not.be.empty;
            expect(response.body.data.lms.title).to.include('Anhanguera Interlagos');
            expect(response.body.data.lms.total_classes).not.be.null;
            expect(response.body.data.lms.total_courses).not.be.null;
            expect(response.body.data.lms.total_courses_active).not.be.null;
            expect(response.body.data.lms.updated_at).not.be.empty;
            console.log("id lms", response.body.data.lms.id)
        })
    })

    it('criando Lms courses para lessons ', () => {
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/lms/${getLmsIdCourse()}/courses/create`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {

                "file_id": null,
                "title": "Curso de Matematica",
                "description": "Descrição do Curso",
                "is_free": 1,
                "coins": "0",
                "price": "1000",
                "registration_start": "12/01/2030 03:10:00",
                "registration_end": "12/10/2030 03:10:00",
                "course_end": "12/20/2030 03:10:00",
                "order": 0,
                "credit_coins": 0,
                "card_home_enable": 1,
                "show_title_card": 1,
                "card_thumb_file_id": 6,
                "card_thumb_hover_file_id": 6,
                "file_hover_id": 6
            }
        }).then((response) => {
            setLmsIDNew(response.body?.data?.courses?.id)
            expect(response.status).to.eq(200);
            console.log("id course", response.body.data.courses.id)

        })
    })

    it('criando sections ', () => {
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/create`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "file_id": null,
                "title": "Section 01",
                "description": "Descrição da sessão.",
                "order": 0,
                "active": 1,
                "credit_coins": 100
            }
        }).then((response) => {
            setLmsIDSections(response.body.data.courses.sections[0].id)
            expect(response.status).to.eq(200);
            expect(response.body.data.courses.sections[0].active).not.be.null;
            expect(response.body.data.courses.sections[0].course_id).not.be.null;
            expect(response.body.data.courses.sections[0].created_at).not.be.empty;
            expect(response.body.data.courses.sections[0].credit_coins).not.be.null;
            expect(response.body.data.courses.sections[0].description).to.include('Descrição da sessão.');
            expect(response.body.data.courses.sections[0].id).not.be.null;
            expect(response.body.data.courses.sections[0].order).not.be.null;
            expect(response.body.data.courses.sections[0].slug).not.be.empty;
            expect(response.body.data.courses.sections[0].title).not.be.empty;
            expect(response.body.data.courses.sections[0].total_lessons).not.be.null;
            expect(response.body.data.courses.sections[0].updated_at).not.be.empty;
            console.log("id sections", response.body.data.courses.sections[0].id)
        })
    })

    it('criando lessons', () => {
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/create`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "file_id": 5,
                "title": "como fazer bagunca",
                "description": "Descrição da lição.",
                "order": 0,
                "active": 1,
                "credit_coins": 100
            }
        }).then((response) => {
            setLmsIDLessons(response.body.data.sections.lessons[0].id)
            expect(response.status).to.eq(200);
            expect(response.body.data.sections.lessons[0].active).not.be.null;
            expect(response.body.data.sections.lessons[0].created_at).not.be.empty;
            expect(response.body.data.sections.lessons[0].credit_coins).not.be.null;
            expect(response.body.data.sections.lessons[0].description).not.be.empty;
            expect(response.body.data.sections.lessons[0].file_id).not.be.null;
            expect(response.body.data.sections.lessons[0].id).not.be.null;
            expect(response.body.data.sections.lessons[0].order).not.be.null;
            expect(response.body.data.sections.lessons[0].section_id).not.be.null;
            expect(response.body.data.sections.lessons[0].slug).not.be.empty;
            expect(response.body.data.sections.lessons[0].thumbnail).not.be.empty;
            expect(response.body.data.sections.lessons[0].title).to.include('como fazer bagunca');
            expect(response.body.data.sections.lessons[0].total_contents).not.be.null;
            expect(response.body.data.sections.lessons[0].updated_at).not.be.empty;
            console.log("id lessons", response.body.data.sections.lessons[0].id)
        })
    })

    it('criando contents Tittle', () => {
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}/contents/create`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "file_id": null,
                "action_type": "title",
                "action_value": "Formula 1",
                "action_options": {
                    "multiple_times": false
                },
                "order": 0

            }
        }).then((response) => {
            setLmsIDContents(response.body.data.lessons.contents[0].id)
            expect(response.status).to.eq(200);
            expect(response.body.data.lessons.contents[0].action_type).to.include('title');
            expect(response.body.data.lessons.contents[0].action_value).to.include('Formula 1');
            console.log("id contents", response.body.data.lessons.contents[0].id)
        })
    })

    it('Validando Retorno de contents titles ', () => {
        cy.request({
            method: 'GET',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}/contents/${getLmsIdContents()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data.contents.action_type).to.include('title');
            expect(response.body.data.contents.action_value).to.include('Formula');
        })
    })

    it('Editando contents title para text', () => {
        cy.request({
            method: 'PUT',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}/contents/update/${getLmsIdContents()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "file_id": null,
                "action_type": "text",
                "action_value": "Stock Car",
                "action_options": {
                    "multiple_times": false
                },
                "order": 0

            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data.contents.action_type).to.include('text');
            expect(response.body.data.contents.action_value).to.include('Stock Car');
        })
    })

    it('Validando Retorno de contents Text ', () => {
        cy.request({
            method: 'GET',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}/contents/${getLmsIdContents()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data.contents.action_type).to.include('text');
            expect(response.body.data.contents.action_value).to.include('Stock Car');
        })
    })

    it('Editando Para Audio', () => {

        cy.request({
            method: 'PUT',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}/contents/update/${getLmsIdContents()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "file_id": getLmsIdUploadAudio(),
                "action_type": "audio",
                "action_value": null,
                "action_options": {
                    "multiple_times": false
                },
                "order": 0

            }
        }).then((response) => {
            expect(response.status).to.eq(200);
        })
    })

    it('Validando Retorno de contents Audio ', () => {
        cy.request({
            method: 'GET',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}/contents/${getLmsIdContents()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            console
            expect(response.body.data.contents.action_type).to.include('audio');
            expect(response.body.data.contents.action_value).not.be.null;
        })
    })

    it('Editando Para PDF', () => {

        cy.request({
            method: 'PUT',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}/contents/update/${getLmsIdContents()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "file_id": getLmsIdUploadPdf(),
                "action_type": "pdf",
                "action_value": null,
                "action_options": {
                    "multiple_times": false
                },
                "order": 0

            }
        }).then((response) => {
            expect(response.status).to.eq(200);
        })
    })

    it('Validando Retorno de contents Pdf ', () => {
        cy.request({
            method: 'GET',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}/contents/${getLmsIdContents()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            console
            expect(response.body.data.contents.action_type).to.include('pdf');
            expect(response.body.data.contents.action_value).not.be.null;
        })
    })

    it('Editando Para Image', () => {

        cy.request({
            method: 'PUT',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}/contents/update/${getLmsIdContents()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "file_id": getLmsIdUploadImage(),
                "action_type": "image",  // title, text, audio, image, video, video_public, pdf, iframe, quiz, form
                "action_value": null,
                "action_options": {     // FORM | QUIZ: multiple_times = (bool)
                    "multiple_times": false
                },
                "order": 0

            }
        }).then((response) => {
            expect(response.status).to.eq(200);
        })
    })

    it('Validando Retorno de contents image ', () => {
        cy.request({
            method: 'GET',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}/contents/${getLmsIdContents()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            console
            expect(response.body.data.contents.action_type).to.include('image');
            expect(response.body.data.contents.action_value).not.be.null;
        })
    })
    it('Editando Para Video', () => {

        cy.request({
            method: 'PUT',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}/contents/update/${getLmsIdContents()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "file_id": getLmsIdUploadVideo(),
                "action_type": "video",
                "action_value": null,
                "action_options": {
                    "multiple_times": false
                },
                "order": 0

            }
        }).then((response) => {
            expect(response.status).to.eq(200);
        })
    })

    it('Validando Retorno de contents video ', () => {
        cy.request({
            method: 'GET',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}/contents/${getLmsIdContents()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            console
            expect(response.body.data.contents.action_type).to.include('video');
            expect(response.body.data.contents.action_value).not.be.null;
        })
    })

    it('Editando Para video_Public', () => {

        cy.request({
            method: 'PUT',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}/contents/update/${getLmsIdContents()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "file_id": null,
                "action_type": "video_public",
                "action_value": "https://www.youtube.com/embed/4fezP875xOQ",
                "action_options": {
                    "multiple_times": false
                },
                "order": 0

            }
        }).then((response) => {
            expect(response.status).to.eq(200);
        })
    })

    it('Validando Retorno de contents video_public ', () => {
        cy.request({
            method: 'GET',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}/contents/${getLmsIdContents()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data.contents.action_type).to.include('video_public');
            expect(response.body.data.contents.action_value).not.be.null;
        })
    })


    it('Editando Para iframe', () => {

        cy.request({
            method: 'PUT',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}/contents/update/${getLmsIdContents()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "file_id": null,
                "action_type": "iframe",
                "action_value": "https://vrglass.com/home/",
                "action_options": {
                    "multiple_times": false
                },
                "order": 0

            }
        }).then((response) => {
            expect(response.status).to.eq(200);
        })
    })

    it('Validando Retorno de contents iframe ', () => {
        cy.request({
            method: 'GET',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}/contents/${getLmsIdContents()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            console
            expect(response.body.data.contents.action_type).to.include('iframe');
            expect(response.body.data.contents.action_value).not.be.null;
        })
    })

    it('Editando Para quiz', () => {

        cy.request({
            method: 'PUT',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}/contents/update/${getLmsIdContents()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "file_id": null,
                "action_type": "quiz",
                "action_value": "1",
                "action_options": {
                    "multiple_times": false
                },
                "order": 0

            }
        }).then((response) => {
            expect(response.status).to.eq(200);
        })
    })

    it('Validando Retorno de contents quiz ', () => {
        cy.request({
            method: 'GET',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}/contents/${getLmsIdContents()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            console
            expect(response.body.data.contents.action_type).to.include('quiz');
            expect(response.body.data.contents.action_value).not.be.null;
        })
    })

    it('Editando Para form', () => {

        cy.request({
            method: 'PUT',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}/contents/update/${getLmsIdContents()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "file_id": null,
                "action_type": "form",
                "action_value": "2",
                "action_options": {
                    "multiple_times": false
                },
                "order": 0

            }
        }).then((response) => {
            expect(response.status).to.eq(200);

        })
    })

    it('Validando Retorno de contents form ', () => {
        cy.request({
            method: 'GET',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}/contents/${getLmsIdContents()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            console
            expect(response.body.data.contents.action_type).to.include('form');
            expect(response.body.data.contents.action_value).not.be.null;
        })
    })

    it('deletando  contets', () => {
        cy.request({
            method: 'DELETE',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}/contents/delete/${getLmsIdContents()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
        })
    })

    it('deletando lms Criado', () => {
        cy.request({
            method: 'DELETE',
            url: `${getUrlApi()}/lms/delete/${getLmsIdCourse()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(200);
        })
    })

    /////////////////////////////////////////FLUXO NEGATIVO//////////////////////////////////////////////////////////////////////////////////

    it('criando contents Tittle action type null', () => {
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}/contents/create`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "file_id": "Formula 1",
                "action_type": "title",
                "action_value": null,
                "action_options": {
                    "multiple_times": false
                },
                "order": 0

            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(422);
        })
    })

    it('Editando contents title para text com action value null ', () => {
        cy.request({
            method: 'PUT',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}/contents/update/${getLmsIdContents()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "file_id": "Stock Car",
                "action_type": "text",
                "action_value": null,
                "action_options": {
                    "multiple_times": false
                },
                "order": 0

            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(422);
        })
    })

    it('Editando Para Audio sem audio', () => {

        cy.request({
            method: 'PUT',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}/contents/update/${getLmsIdContents()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "file_id": "",
                "action_type": "audio",
                "action_value": null,
                "action_options": {
                    "multiple_times": false
                },
                "order": 0

            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        })
    })
    it('Editando Para PDF sem pdf ', () => {

        cy.request({
            method: 'PUT',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}/contents/update/${getLmsIdContents()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "file_id": "",
                "action_type": "pdf",
                "action_value": null,
                "action_options": {
                    "multiple_times": false
                },
                "order": 0

            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        })
    })

    it('Editando Para Imagem sem imagem', () => {

        cy.request({
            method: 'PUT',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}/contents/update/${getLmsIdContents()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "file_id": "",
                "action_type": "image",  
                "action_value": null,
                "action_options": {     
                    "multiple_times": false
                },
                "order": 0

            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        })
    })

    it('Editando Para Video sem video', () => {

        cy.request({
            method: 'PUT',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}/contents/update/${getLmsIdContents()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "file_id": "",
                "action_type": "video",
                "action_value": null,
                "action_options": {
                    "multiple_times": false
                },
                "order": 0

            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        })
    })

    it('Editando Para video_Public no campo incorreto de file_id', () => {
        cy.request({
            method: 'PUT',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}/contents/update/${getLmsIdContents()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "file_id": "https://www.youtube.com/embed/4fezP875xOQ",
                "action_type": "video_public",
                "action_value": null,
                "action_options": {
                    "multiple_times": false
                },
                "order": 0

            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(422);
        })
    })

    it('Editando Para iframe no campo incorreto file_id', () => {

        cy.request({
            method: 'PUT',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}/contents/update/${getLmsIdContents()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "file_id": "https://vrglass.com/home/",
                "action_type": "iframe",
                "action_value": null,
                "action_options": {
                    "multiple_times": false
                },
                "order": 0

            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(422);
        })
    })

    it('Editando Para quiz no campo incorreto file_id', () => {

        cy.request({
            method: 'PUT',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}/contents/update/${getLmsIdContents()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "file_id": "1",
                "action_type": "quiz",
                "action_value": null,
                "action_options": {
                    "multiple_times": false
                },
                "order": 0

            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        })
    })

    it('Editando Para form com form no campo incorreto file_id', () => {

        cy.request({
            method: 'PUT',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}/contents/update/${getLmsIdContents()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "file_id": "2",
                "action_type": "form",
                "action_value": null,
                "action_options": {
                    "multiple_times": false
                },
                "order": 0

            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        })
    })

    it('criando contents Tittle com action_value null', () => {
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}/contents/create`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "file_id": null,
                "action_type": "title",
                "action_value": null,
                "action_options": {
                    "multiple_times": false
                },
                "order": 0

            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        })
    })

    it('criando contents text com action_value null', () => {
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}/contents/create`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "file_id": null,
                "action_type": "text",
                "action_value": null,
                "action_options": {
                    "multiple_times": false
                },
                "order": 0

            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        })
    })
    it('criando contents text com audio', () => {
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}/contents/create`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "file_id": getLmsIdUploadAudio(),
                "action_type": "text",
                "action_value": null,
                "action_options": {
                    "multiple_times": false
                },
                "order": 0

            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        })
    })

    it('criando contents text com image', () => {
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}/contents/create`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "file_id": getLmsIdUploadImage(),
                "action_type": "text",
                "action_value": null,
                "action_options": {
                    "multiple_times": false
                },
                "order": 0

            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        })
    })
    it('criando contents text com video', () => {
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}/contents/create`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "file_id": getLmsIdUploadVideo(),
                "action_type": "text",
                "action_value": null,
                "action_options": {
                    "multiple_times": false
                },
                "order": 0

            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        })
    })

    it('criando contents text com pdf', () => {
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}/contents/create`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "file_id": getLmsIdUploadPdf(),
                "action_type": "text",
                "action_value": null,
                "action_options": {
                    "multiple_times": false
                },
                "order": 0

            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        })
    })
    it('criando contents title com action_value null', () => {
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}/contents/create`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "file_id": null,
                "action_type": "title",
                "action_value": null,
                "action_options": {
                    "multiple_times": false
                },
                "order": 0

            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        })
    })

    it('criando contents title com audio', () => {
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}/contents/create`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "file_id": getLmsIdUploadAudio(),
                "action_type": "title",
                "action_value": "sssss",
                "action_options": {
                    "multiple_times": false
                },
                "order": 0

            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        })
    })

    it('criando contents title com video', () => {
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}/contents/create`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "file_id": getLmsIdUploadVideo(),
                "action_type": "title",
                "action_value": "sssss",
                "action_options": {
                    "multiple_times": false
                },
                "order": 0

            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        })
    })

    it('criando contents title com image', () => {
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}/contents/create`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "file_id": getLmsIdUploadImage(),
                "action_type": "title",
                "action_value": "sssss",
                "action_options": {
                    "multiple_times": false
                },
                "order": 0

            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        })
    })
    it('criando contents title com pdf', () => {
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}/contents/create`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "file_id": getLmsIdUploadPdf(),
                "action_type": "title",
                "action_value": "sssss",
                "action_options": {
                    "multiple_times": false
                },
                "order": 0

            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        })
    })

    it('criando contents public_video com action_value null', () => {
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}/contents/create`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "file_id": null,
                "action_type": "video_public",
                "action_value": null,
                "action_options": {
                    "multiple_times": false
                },
                "order": 0

            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        })
    })

    it('criando contents public_video com audio', () => {
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}/contents/create`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "file_id": getLmsIdUploadAudio(),
                "action_type": "video_public",
                "action_value": null,
                "action_options": {
                    "multiple_times": false
                },
                "order": 0

            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        })
    })
    it('criando contents public_video com image', () => {
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}/contents/create`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "file_id": getLmsIdUploadImage(),
                "action_type": "video_public",
                "action_value": null,
                "action_options": {
                    "multiple_times": false
                },
                "order": 0

            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        })
    })

    it('criando contents public_video com pdf', () => {
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}/contents/create`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "file_id": getLmsIdUploadPdf(),
                "action_type": "video_public",
                "action_value": null,
                "action_options": {
                    "multiple_times": false
                },
                "order": 0

            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        })
    })

    it('criando contents public_video com video', () => {
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}/contents/create`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "file_id": getLmsIdUploadVideo(),
                "action_type": "video_public",
                "action_value": null,
                "action_options": {
                    "multiple_times": false
                },
                "order": 0

            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        })
    })

    it('criando contents iframe com action_value null', () => {
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}/contents/create`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "file_id": null,
                "action_type": "iframe",
                "action_value": null,
                "action_options": {
                    "multiple_times": false
                },
                "order": 0

            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        })
    })


    it('criando contents iframe com image', () => {
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}/contents/create`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "file_id":getLmsIdUploadImage() ,
                "action_type": "iframe",
                "action_value": null,
                "action_options": {
                    "multiple_times": false
                },
                "order": 0

            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        })
    })
    it('criando contents iframe com pdf', () => {
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}/contents/create`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "file_id":getLmsIdUploadPdf() ,
                "action_type": "iframe",
                "action_value": null,
                "action_options": {
                    "multiple_times": false
                },
                "order": 0

            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        })
    })

    it('criando contents iframe com video', () => {
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}/contents/create`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "file_id":getLmsIdUploadVideo() ,
                "action_type": "iframe",
                "action_value": null,
                "action_options": {
                    "multiple_times": false
                },
                "order": 0

            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        })
    })

    it('criando contents iframe com audio', () => {
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}/contents/create`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "file_id":getLmsIdUploadAudio() ,
                "action_type": "iframe",
                "action_value": null,
                "action_options": {
                    "multiple_times": false
                },
                "order": 0

            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        })
    })


    it('criando contents text com token invalido', () => {
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}/contents/create`,
            headers: {
                Authorization: getTokenIvanlido(),
                Accept: "application/json"
            },
            body: {
                "file_id": null ,
                "action_type": "text",
                "action_value": "diuahsudai",
                "action_options": {
                    "multiple_times": false
                },
                "order": 0

            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401);
        })
    })

    it('deletando  contets', () => {
        cy.request({
            method: 'DELETE',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}/contents/delete/${getLmsIdContents()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
    })
    })
})