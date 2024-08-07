import { getToken, getUrlApi, getTokenIvanlido } from '../support/helper';
import {
    setLmsID, setLmsIDDuplicate, setLmsIDCourse, setLmsIDNew, setLmsIDCourseDuplicate, setLmsIDLessons
    , getLmsId, getLmsIdSections, setLmsIDSections,
    getLmsIdCourseIDNew, getLmsIdDuplicate, getLmsIdCourse, getLmsIdLessons,
    getLmsIdCourseIDDuplicate, getLmsIdNew
} from '../support/variables/lms';

describe('Validando Lessons', function () {

    it('criando Lms Para Criar course e lessons ', () => {
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


        })
    })

    it('Validando Retorno de lista do lessons criado ', () => {
        cy.request({
            method: 'GET',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data.lessons.title).to.include('como fazer bagunca');
        })
    })

    it('editando lessons', () => {
        cy.request({
            method: 'PUT',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/update/${getLmsIdLessons()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "file_id": 5,
                "title": "Sou lindao",
                "description": "Descrição da lição.",
                "order": 0,
                "active": 1,
                "credit_coins": 100

            }
        }).then((response) => {
            // setLmsIDLessons(response.body.data.sections.lessons[0].id)       
            expect(response.status).to.eq(200);
            expect(response.body.data.lessons.active).not.be.null;
            expect(response.body.data.lessons.created_at).not.be.empty;
            expect(response.body.data.lessons.credit_coins).not.be.null;
            expect(response.body.data.lessons.description).not.be.empty;
            expect(response.body.data.lessons.file_id).not.be.null;
            expect(response.body.data.lessons.id).not.be.null;
            expect(response.body.data.lessons.order).not.be.null;
            expect(response.body.data.lessons.section_id).not.be.null;
            expect(response.body.data.lessons.slug).not.be.empty;
            expect(response.body.data.lessons.thumbnail).not.be.empty;
            expect(response.body.data.lessons.title).to.include('Sou lindao');
            expect(response.body.data.lessons.total_contents).not.be.null;
            expect(response.body.data.lessons.updated_at).not.be.empty;
        })
    })


    it('Validando Retorno de lista do lessons editado ', () => {
        cy.request({
            method: 'GET',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data.lessons.title).to.include('Sou lindao');
        })
    })


    it('Deletando lessons ', () => {
        cy.request({
            method: 'DELETE',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/delete/${getLmsIdLessons()}`,
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
    /////////////////////////// negativos ////////////////////////////////

    it('Deletando lessons ja deletado ', () => {
        cy.request({
            method: 'DELETE',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/delete/${getLmsIdLessons()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        })
    })
    it('Deletando lessons inexistente ', () => {
        cy.request({
            method: 'DELETE',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/delete/4623974623784627839`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        })
    })

    it('editando lessons inexistente ', () => {
        cy.request({
            method: 'PUT',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/update/3912371297389123`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "file_id": 5,
                "title": "Sou lindao",
                "description": "Descrição da lição.",
                "order": 0,
                "active": 1,
                "credit_coins": 100

            },
            failOnStatusCode: false
        }).then((response) => {
            // setLmsIDLessons(response.body.data.sections.lessons[0].id)       
            expect(response.status).to.eq(400);

        })
    })

    it('editando lessons inexistente com dados invalidos no body ', () => {
        cy.request({
            method: 'PUT',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/update/${getLmsIdLessons()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "file_dasdasdid": 5,
                "titldasde": "Sou lindao",
                "desadsdascription": "Descrição da lição.",
                "ordasdaser": 0,
                "actasdasive": 1,
                "creasdasdasdasdit_coins": 100

            },
            failOnStatusCode: false
        }).then((response) => {
            // setLmsIDLessons(response.body.data.sections.lessons[0].id)       
            expect(response.status).to.eq(422);

        })
    })

    it('editando lessons com campos vazios', () => {
        cy.request({
            method: 'PUT',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/update/${getLmsIdLessons()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "file_id": 5,
                "title": "",
                "description": "",
                "order": 0,
                "active": 1,
                "credit_coins": 100

            },
            failOnStatusCode: false
        }).then((response) => {
            // setLmsIDLessons(response.body.data.sections.lessons[0].id)       
            expect(response.status).to.eq(422);

        })
    })
    it('criando lessons com token invalido', () => {
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/create`,
            headers: {
                Authorization: getTokenIvanlido(),
                Accept: "application/json"
            },
            body: {
                "file_id": 5,
                "title": "como fazer bagunca",
                "description": "Descrição da lição.",
                "order": 0,
                "active": 1,
                "credit_coins": 100

            },
            failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(401);
        })
    })

    it('criando lessons dados invalidos na requisicao', () => {
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/create/73128937912793`,
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

            },
            failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(404);
        })
    })
    it('criando lessons dados vazios', () => {
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/create`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "file_id": 5,
                "title": "",
                "description": "",
                "order": 0,
                "active": 1,
                "credit_coins": 100

            },
            failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(422);
        })
    })

    it('Validando Retorno de lista do lessons editado ja deletado ', () => {
        cy.request({
            method: 'GET',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/${getLmsIdLessons()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        })
    })
    it('Validando Retorno de lista do lessons inexistente ', () => {
        cy.request({
            method: 'GET',
            url: `${getUrlApi()}/lms/courses/${getLmsIdCourseIDNew()}/sections/${getLmsIdSections()}/lessons/361273182361782638`,
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