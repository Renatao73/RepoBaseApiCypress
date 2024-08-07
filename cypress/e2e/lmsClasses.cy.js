
import { getToken, getUrlApi, getTokenIvanlido } from '../support/helper';
import {
    setLmsID, setLmsIDDuplicate, setLmsIDCourse, setLmsIDNew, setLmsIDCourseDuplicate, setLmsIDLessons
    , getLmsId, getLmsIdSections, setLmsIDSections, setLmsIDContents, setLmsIDUploadAudio, setLmsIDUploadPdf, setLmsIDUploadImage,
    setLmsIDUploadVideo, setLmsIDCategories,setLmsIDClasses,

    getLmsIdCourseIDNew, getLmsIdDuplicate, getLmsIdCourse, getLmsIdLessons, getLmsIdContents, getLmsIdCategories,getLmsIdClasses,
    getLmsIdCourseIDDuplicate, getLmsIdNew, getLmsIdUploadAudio, getLmsIdUploadPdf, getLmsIdUploadImage, getLmsIdUploadVideo
} from '../support/variables/lms';


describe('Validando Classes', function () {

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

    it('criando classes ', () => {
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/lms/classes/create`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                  "course_id": getLmsIdCourseIDNew(),
                  "title": "Marvel",
                  "limit": 0
            }
        }).then((response) => {
            setLmsIDClasses(response.body.data.classes.id) 
            expect(response.status).to.eq(200);
            expect(response.body.data.classes.course_id).not.be.null;
            expect(response.body.data.classes.created_at).not.be.empty;
            expect(response.body.data.classes.id).not.be.null;
            expect(response.body.data.classes.limit).not.be.null;
            expect(response.body.data.classes.slug).not.be.null;
            expect(response.body.data.classes.title).to.include('Marvel');
            expect(response.body.data.classes.total_users).not.be.null;
            expect(response.body.data.classes.updated_at).not.be.null;
            console.log("id ", response.body.data.classes.id)
        })
    })

    it('Validando Retorno de classes ', () => {
        cy.request({
            method: 'GET',
            url: `${getUrlApi()}/lms/classes/list/${getLmsIdClasses()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data.classes.title).to.include('Marvel');
        })
    })

   
    it('editando classes criado', () => {
        cy.request({
            method: 'PUT',
            url: `${getUrlApi()}/lms/classes/update/${getLmsIdClasses()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "course_id": getLmsIdCourseIDNew(),
                "title": "Batman Beginis",
                "limit": 400
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data.classes.title).to.include('Batman Beginis');
        })
    })

    it('Validando Retorno de classes editado', () => {
        cy.request({
            method: 'GET',
            url: `${getUrlApi()}/lms/classes/list/${getLmsIdClasses()}`,

            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data.classes.title).to.include('Batman Beginis');
        })
    })

    it('deletando classes', () => {
        cy.request({
            method: 'DELETE',
            url: `${getUrlApi()}/lms/classes/delete/${getLmsIdClasses()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
        })
    })

    it('deletando classes ja deletada', () => {
        cy.request({
            method: 'DELETE',
            url: `${getUrlApi()}/lms/classes/delete/${getLmsIdClasses()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        })
    })

    it('confirmar que foi deletado', () => {
        cy.request({
            method: 'GET',
            url: `${getUrlApi()}/lms/classes/list/${getLmsIdClasses()}`,

            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.data.id).to.include('Class not found.');
        })
    })

    it('deletando lms Criado', () => {
        cy.request({
            method: 'DELETE',
            url: `${getUrlApi()}/lms/delete/${getLmsIdCourse()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
        })
    })

    it('criando classes com dados ', () => {
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/lms/classes/create`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                  "course_id": '320498230948230948023984902384390432',
                  "titlewewe": "Marvel",
                  "limit": 0
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(422);
        })
    })

    it('editando classes incorreta', () => {
        cy.request({
            method: 'PUT',
            url: `${getUrlApi()}/lms/classes/update/`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "course_id": '',
                "title": "Batman Beginis",
                "limit": 400
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404);
        })
    })
    it('criando classes com token invalido', () => {
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/lms/classes/create`,
            headers: {
                Authorization: getTokenIvanlido(),
                Accept: "application/json"
            },
            body: {
                  "course_id": getLmsIdCourseIDNew(),
                  "title": "Marvel",
                  "limit": 0
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401);
        })
    })
})