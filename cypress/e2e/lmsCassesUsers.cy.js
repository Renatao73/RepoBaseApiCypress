import { getToken, getUrlApi, getTokenIvanlido } from '../support/helper';
import {
    setLmsID, setLmsIDDuplicate, setLmsIDCourse, setLmsIDNew, setLmsIDCourseDuplicate, setLmsIDLessons
    , getLmsId, getLmsIdSections, setLmsIDSections, setLmsIDContents, setLmsIDUploadAudio, setLmsIDUploadPdf, setLmsIDUploadImage,
    setLmsIDUploadVideo, setLmsIDCategories, setLmsIDClasses, setLmsIDClassesUsers, setLmsIDClassesUsersToken, setLmsIDClassesIdSwap,

    getLmsIdCourseIDNew, getLmsIdDuplicate, getLmsIdCourse, getLmsIdLessons, getLmsIdContents, getLmsIdCategories, getLmsIdClasses, getLmsIdClassesUsersToken,
    getLmsIdCourseIDDuplicate, getLmsIdNew, getLmsIdUploadAudio, getLmsIdUploadPdf, getLmsIdUploadImage, getLmsIdUploadVideo, getLmsIdClassesUsers, getLmsIdClassesIdSwap
} from '../support/variables/lms';

describe('Validando Classes Users', function () {

    it('criando Lms para criar users ', () => {
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

    it('criando Lms courses para lessons para criar users ', () => {
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

    it('criando classes para criar users ', () => {
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

    const formData = new FormData();
    formData.append("name", "ff5ee")
    formData.append("email", "tesgey@3isefdiuidf3d.com")
    formData.append("nickname", "hudhfefs")
    formData.append("user_type", "fhdsueffs")
    formData.append("password", "123456789")
    formData.append("password_confirmation", "123456789")
    formData.append("nationality", "brasil")

    it('criando users ', () => {
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/registerWithAge`,
            headers: {
                Authorization: getToken(),
                Accept:
                    "application/json",
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        }).then((response) => {
            const bodyString = Cypress.Blob.arrayBufferToBinaryString(response.body);
            const body = JSON.parse(bodyString);
            console.log(body.token)
            console.log(body.id)
            setLmsIDClassesUsers(body.id)
            setLmsIDClassesUsersToken(body.token)
            console.log("token", getLmsIdClassesUsersToken())

        })
    })


    it('Validando Retorno de course ', () => {
        cy.request({
            method: 'GET',
            url: `${getUrlApi()}/lms/${getLmsIdCourse()}/courses/`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data.courses[0].title).to.include('Curso de Matematica');
            setLmsIDClassesIdSwap(response.body.data.courses[0].classes[0].id)
        })
    })

    it('adcionando user a classe', () => {
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/lms/classes/${getLmsIdClasses()}/users/add/${getLmsIdClassesUsers()}`,
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
            expect(response.status).to.eq(200);
            expect(response.body.data.user.email).not.be.null;
            expect(response.body.data.user.name).not.be.null;
            expect(response.body.data.user.nationality).not.be.null;
            expect(response.body.data.user.nickname).not.be.null;
            expect(response.body.data.user.user_type).not.be.null;
            expect(response.body.data.user.email).to.include('tesgey@3isefdiuidf3d.com');
            expect(response.body.data.user.name).to.include('ff5ee');
            expect(response.body.data.user.nationality).to.include('brasil');
            expect(response.body.data.user.nickname).to.include('hudhfefs');
            expect(response.body.data.user.user_type).to.include('participant');
            expect(response.body.data.user.id).not.be.null;
        })
    })

    it('Validando lista de users adcionados', () => {
        cy.request({
            method: 'GET',
            url: `${getUrlApi()}/lms/classes/${getLmsIdClasses()}/users`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data.users.data[0].name).to.include('ff5ee');
            expect(response.body.data.users.data[0].nationality).to.include('brasil');
            expect(response.body.data.users.data[0].nickname).to.include('hudhfefs');
            expect(response.body.data.users.data[0].email).to.include('tesgey@3isefdiuidf3d.com');
            expect(response.body.data.users.data[0].user_type).to.include('participant');
            expect(response.body.data.users.data[0].id).not.be.null;
        })
    })
    
    it('trocando user de classe', () => {
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/lms/classes/${getLmsIdClassesIdSwap()}/swap-user/${getLmsIdClassesUsers()}`,
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
            expect(response.status).to.eq(200);
        })
    })

    it('Validando que user foi trocado', () => {
        cy.request({
            method: 'GET',
            url: `${getUrlApi()}/lms/classes/${getLmsIdClassesIdSwap()}/users`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data.users.data[0].name).to.include('ff5ee');
            expect(response.body.data.users.data[0].nationality).to.include('brasil');
            expect(response.body.data.users.data[0].nickname).to.include('hudhfefs');
            expect(response.body.data.users.data[0].email).to.include('tesgey@3isefdiuidf3d.com');
            expect(response.body.data.users.data[0].user_type).to.include('participant');
            expect(response.body.data.users.data[0].id).not.be.null;
        })
    })

    it('deletando  users da classe incorreta', () => {
        cy.request({
            method: 'DELETE',
            url: `${getUrlApi()}/lms/classes/${getLmsIdClasses()}/users/remove/${getLmsIdClassesUsers()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.data.uid).not.be.null;

        })
    })

    it('deletando  users da classe', () => {
        cy.request({
            method: 'DELETE',
            url: `${getUrlApi()}/lms/classes/${getLmsIdClassesIdSwap()}/users/remove/${getLmsIdClassesUsers()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
        })
    })

    it('Validar que foi deletado o user da classe', () => {
        cy.request({
            method: 'GET',
            url: `${getUrlApi()}/lms/classes/${getLmsIdClasses()}/users`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(200);
            cy.wrap(response.body.data.users.data).should('not.contain', 'ff5ee');
            cy.wrap(response.body.data.users.data).should('not.contain', 'brasil');
            cy.wrap(response.body.data.users.data).should('not.contain', 'hudhfefs');
            cy.wrap(response.body.data.users.data).should('not.contain', 'tesgey@3isefdiuidf3d.com');
            cy.wrap(response.body.data.users.data).should('not.contain', 'participant');
        })
    })



    it('deletando  users criado', () => {
        cy.request({
            method: 'DELETE',
            url: `${getUrlApi()}/user`,
            headers: {
                Authorization: getLmsIdClassesUsersToken(),
                Accept: "application/json"
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
        })
    })
    it('deletando Course', () => {
        cy.request({
            method: 'DELETE',
            url: `${getUrlApi()}/lms/${getLmsIdCourse()}/courses/delete/${getLmsIdCourseIDNew()}`,
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
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
        })
    })

    it('deletando  users ja deletado', () => {
        cy.request({
            method: 'DELETE',
            url: `${getUrlApi()}/user`,
            headers: {
                Authorization: getLmsIdClassesUsersToken(),
                Accept: "application/json"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401);
        })
    })
    it('deletando  users da classe ja deletado', () => {
        cy.request({
            method: 'DELETE',
            url: `${getUrlApi()}/lms/classes/${getLmsIdClasses()}/users/remove/${getLmsIdClassesUsers()}`,
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