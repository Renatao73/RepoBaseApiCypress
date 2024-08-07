
import { getToken, getUrlApi, getTokenIvanlido } from '../support/helper';
import {
    setLmsID, setLmsIDDuplicate, setLmsIDCourse, setLmsIDNew, setLmsIDCourseDuplicate, setLmsIDLessons
    , getLmsId, getLmsIdSections, setLmsIDSections, setLmsIDContents, setLmsIDUploadAudio, setLmsIDUploadPdf, setLmsIDUploadImage,
    setLmsIDUploadVideo, setLmsIDCategories,

    getLmsIdCourseIDNew, getLmsIdDuplicate, getLmsIdCourse, getLmsIdLessons, getLmsIdContents, getLmsIdCategories,
    getLmsIdCourseIDDuplicate, getLmsIdNew, getLmsIdUploadAudio, getLmsIdUploadPdf, getLmsIdUploadImage, getLmsIdUploadVideo
} from '../support/variables/lms';


describe('Validando categories', function () {

    it('criando lms para categories ', () => {
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

    it('criando categories ', () => {
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/lms/${getLmsIdCourse()}/categories/create`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "title": "Anhanguera Interlagos"
            }
        }).then((response) => {
            setLmsIDCategories(response.body.data.categories.id)
            expect(response.status).to.eq(200);
            expect(response.body.data.categories.created_at).not.be.empty;
            expect(response.body.data.categories.id).not.be.null;
            expect(response.body.data.categories.lms_id).not.be.null;
            expect(response.body.data.categories.order).not.be.null;
            expect(response.body.data.categories.slug).not.be.empty;
            expect(response.body.data.categories.title).to.include('Anhanguera Interlagos');
            expect(response.body.data.categories.updated_at).not.be.empty;

        })
    })

    it('Validando Retorno categories criado ', () => {
        cy.request({
            method: 'GET',
            url: `${getUrlApi()}/lms/${getLmsIdCourse()}/categories/list/${getLmsIdCategories()}`,

            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data.categories.title).to.include('Anhanguera Interlagos');
        })
    })

    it('editando categories ', () => {
        cy.request({
            method: 'PUT',
            url: `${getUrlApi()}/lms/${getLmsIdCourse()}/categories/update/${getLmsIdCategories()} `,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "title": "Lewis Hamilton"
                //,"order": 0  
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data.categories.title).to.include('Lewis Hamilton');
        })
    })
    it('Validando Retorno categories editado ', () => {
        cy.request({
            method: 'GET',
            url: `${getUrlApi()}/lms/${getLmsIdCourse()}/categories/list/${getLmsIdCategories()}`,

            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data.categories.title).to.include('Lewis Hamilton');
        })
    })

    it('deletando categories', () => {
        cy.request({
            method: 'DELETE',
            url: `${getUrlApi()}/lms/${getLmsIdCourse()}/categories/delete/${getLmsIdCategories()}`,

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

    ///////////////////////////////FLUXO NEGATIVO///////////////////////////////////////////////////////////////////
    it('deletando categories inexistente', () => {
        cy.request({
            method: 'DELETE',
            url: `${getUrlApi()}/lms/${getLmsIdCourse()}/categories/delete/${getLmsIdCategories()}`,

            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.data.id).to.include('LMS not found.');
        })
    })

    it('deletando categories ja deletado', () => {
        cy.request({
            method: 'DELETE',
            url: `${getUrlApi()}/lms/${getLmsIdCourse()}/categories/delete/37849237492374`,

            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.data.id).to.include('LMS not found.');
        })
    })

    it('deletando categories com token invalido', () => {
        cy.request({
            method: 'DELETE',
            url: `${getUrlApi()}/lms/${getLmsIdCourse()}/categories/delete/${getLmsIdCategories()}`,

            headers: {
                Authorization: getTokenIvanlido(),
                Accept: "application/json"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401);
            expect(response.body.message).to.include('Unauthenticated.');
        })
    })

    it('criando lms para categories sem lms valido ', () => {
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/lms/93084903840/categories/create`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "title": "Anhanguera Interlagos"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);

        })
    })

    it('editando categories inexistente', () => {
        cy.request({
            method: 'PUT',
            url: `${getUrlApi()}/lms/${getLmsIdCourse()}/categories/update/0123127239812703129 `,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "title": "Lewis Hamilton"
                //,"order": 0  
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        })
    })

    it('criando lms para categories com token invalido ', () => {
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/lms/${getLmsIdCourse()}/categories/create`,
            headers: {
                Authorization: getTokenIvanlido(),
                Accept: "application/json"
            },
            body: {
                "title": "Anhanguera Interlagos"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401);
        })
    })

    it('criando lms para body vazio ', () => {
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/lms/${getLmsIdCourse()}/categories/create`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "title": ""
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(422);
            expect(response.body.errors.title[0]).to.include('O campo title é obrigatório.');
        })
    })

    it('criando lms para body incorreto ', () => {
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/lms/${getLmsIdCourse()}/categories/create`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                "titxxxxxxle": ""
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(422);

        })
    })
})