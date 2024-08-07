import { getToken, getUrlApi,getTokenIvanlido} from '../support/helper';
import { setLmsID,setLmsIDDuplicate,setLmsIDCourse, setLmsIDNew, setLmsIDCourseDuplicate
    , getLmsId,
    getLmsIdCourseIDNew, getLmsIdDuplicate , getLmsIdCourse , getLmsIdCourseIDDuplicate, getLmsIdNew} from '../support/variables/lms';
describe('Validando Lms', function () {

/////////////////////////// CRUD DE CRIACAO DO LMS ///////////////////////////////////////

it('Validando token invalido ', () => { 
    cy.request({
        method: 'GET',
        url: `${getUrlApi()}/lms/`,
        headers: {
            Authorization: getTokenIvanlido(),
            Accept: "application/json"
        },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401);
            expect(response.body.message).not.be.empty;
            expect(response.body.message).to.include('Unauthenticated');
        })
    })
})

it('criando Lms ', () => {
    cy.request({
        method: 'POST',
        url: `${getUrlApi()}/lms/create`,
        headers: {
            Authorization: getToken(),
            Accept: "application/json"
        },
        body: {
            "title": "Teste"
        }
    }).then((response) => {
        setLmsID(response.body?.data?.lms?.id)
        expect(response.status).to.eq(200);
        expect(response.body.data.lms.created_at).not.be.empty;
        expect(response.body.data.lms.id).not.be.null;
        expect(response.body.data.lms.slug).not.be.empty;
        expect(response.body.data.lms.title).to.include('Teste');
        expect(response.body.data.lms.total_classes).not.be.null;
        expect(response.body.data.lms.total_courses).not.be.null;
        expect(response.body.data.lms.total_courses_active).not.be.null;
        expect(response.body.data.lms.updated_at).not.be.empty;
        console.log('LMS ID => ', getLmsId())
    })
})

it('Editando Lms ', () => {
    cy.request({
        method: 'PUT',
        url: `${getUrlApi()}/lms/update/${getLmsId()}`,
        headers: {
            Authorization: getToken(),
            Accept: "application/json"
        },
        body: {
            "title": "Guilherme"
        }
    }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data.lms.created_at).not.be.empty;
        expect(response.body.data.lms.id).not.be.null;
        expect(response.body.data.lms.slug).not.be.empty;
        expect(response.body.data.lms.title).to.include('Guilherme');
        expect(response.body.data.lms.total_classes).not.be.null;
        expect(response.body.data.lms.total_courses).not.be.null;
        expect(response.body.data.lms.total_courses_active).not.be.null;
        expect(response.body.data.lms.updated_at).not.be.empty;
    })
})

it('Validando Retorno de lista ', () => {
    cy.request({
        method: 'GET',
        url: `${getUrlApi()}/lms/${getLmsId()}`,
        headers: {
            Authorization: getToken(),
            Accept: "application/json"
        },
    }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data.lms.created_at).not.be.empty;
        expect(response.body.data.lms.id).not.be.null;
        expect(response.body.data.lms.slug).not.be.empty;
        expect(response.body.data.lms.title).not.be.empty;
        expect(response.body.data.lms.total_classes).not.be.null;
        expect(response.body.data.lms.total_courses).not.be.null;
        expect(response.body.data.lms.total_courses_active).not.be.null;
        expect(response.body.data.lms.updated_at).not.be.empty;
    })
})

it('Duplicando Lms', () => {
    cy.request({
        method: 'POST',
        url: `${getUrlApi()}/lms/duplicate/${getLmsId()}`,
        headers: {
            Authorization: getToken(),
            Accept: "application/json"
        },
       
    }).then((response) => {
        setLmsIDDuplicate(response.body?.data?.lms?.id)
        expect(response.status).to.eq(200);
        expect(response.body.data.lms.created_at).not.be.empty;
        expect(response.body.data.lms.id).not.be.null;
        expect(response.body.data.lms.slug).not.be.empty;
        expect(response.body.data.lms.title).not.be.empty;
        expect(response.body.data.lms.total_classes).not.be.null;
        expect(response.body.data.lms.total_courses).not.be.null;
        expect(response.body.data.lms.total_courses_active).not.be.null;
        expect(response.body.data.lms.updated_at).not.be.empty;
        console.log('LMS ID => ', getLmsIdDuplicate())    
       
    })
})

it('Validando Retorno de lista lms duplicado ', () => {
    cy.request({
        method: 'GET',
        url: `${getUrlApi()}/lms/${getLmsIdDuplicate()}`,
        headers: {
            Authorization: getToken(),
            Accept: "application/json"
        },
    }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data.lms.created_at).not.be.empty;
        expect(response.body.data.lms.id).not.be.null;
        expect(response.body.data.lms.slug).not.be.empty;
        expect(response.body.data.lms.title).not.be.empty;
        expect(response.body.data.lms.total_classes).not.be.null;
        expect(response.body.data.lms.total_courses).not.be.null;
        expect(response.body.data.lms.total_courses_active).not.be.null;
        expect(response.body.data.lms.updated_at).not.be.empty;
    })
})

it('deletando lms duplicado', () => {
    cy.request({
        method: 'DELETE',
        url: `${getUrlApi()}/lms/delete/${getLmsIdDuplicate()}`,
        headers: {
            Authorization: getToken(),
            Accept: "application/json"
        },
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(200);

    })
})
 
it('deletando lms Criado', () => {
    cy.request({
        method: 'DELETE',
        url: `${getUrlApi()}/lms/delete/${getLmsId()}`,
        headers: {
            Authorization: getToken(),
            Accept: "application/json"
        },
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(200);

    })
})

it('deletando lms que nao existe ', () => {
    cy.request({
        method: 'DELETE',
        url: `${getUrlApi()}/lms/delete/999`,
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

it('criando Lms com envio de body incorreto ', () => {
    cy.request({
        method: 'POST',
        url:`${getUrlApi()}/lms/create`,
        headers: {
            Authorization: getToken(),
            Accept: "application/json"
        },
        body: {
            "titless": "asdasdasdasxxxx"
        },
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(422);
        expect(response.body.errors.title[0]).to.include('O campo title é obrigatório.');
    })
})

it('Validando Retorno de lista com dados invalidos na requisicao', () => {
    cy.request({
        method: 'GET',
        url: `${getUrlApi()}/lms/33333`,
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

it('Validando Retorno de lista com lms inexistentes ', () => {
    cy.request({
        method: 'GET',
        url: `${getUrlApi()}/lms/${getLmsIdDuplicate()}`,
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