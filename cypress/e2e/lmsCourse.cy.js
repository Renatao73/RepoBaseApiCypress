import { getToken, getUrlApi ,getTokenIvanlido} from '../support/helper';
import { setLmsID,setLmsIDDuplicate,setLmsIDCourse, setLmsIDNew, setLmsIDCourseDuplicate
    , getLmsId,
    getLmsIdCourseIDNew, getLmsIdDuplicate , getLmsIdCourse , getLmsIdCourseIDDuplicate, getLmsIdNew} from '../support/variables/lms';
describe('Validando Course', function () { 
   
    it('criando Lms Para Criar course ', () => {
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
    
    it('criando Lms courses ', () => {
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/lms/${getLmsIdCourse()}/courses/create`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                
                    "file_id":  null,
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
                      "card_thumb_hover_file_id" : 6,
                      "file_hover_id": 6
                
            }
        }).then((response) => {
            setLmsIDNew(response.body?.data?.courses?.id)
            expect(response.status).to.eq(200);
        })
    })
    
    it('criando Lms course com token invalido ', () => {
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/lms/${getLmsIdCourse()}/courses/create`,
            headers: {
                Authorization: getTokenIvanlido(),
                Accept: "application/json"
            },
            body: {
                
                    "file_id":  null,
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
                      "card_thumb_hover_file_id" : 6,
                      "file_hover_id": 6
                
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401);
            expect(response.body.message).not.be.empty;
            expect(response.body.message).to.include('Unauthenticated');
        })
    })
    
    it('criando Lms course com dados invalidos no body ', () => {
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/lms/${getLmsIdCourse()}/courses/create`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                
                    "file_id":  null,
                    "titlex": "Curso de Matematica",
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
                      "card_thumb_hover_file_id" : 6,
                      "file_hover_id": 6
                
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(422);
        })
    })
    
    it('Validando Retorno de course ', () => {
        cy.request({
            method: 'GET',
            url: `${getUrlApi()}/lms/${getLmsIdCourse()}/courses/`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data.courses[0].title).to.include('Curso de Matematica');
        })
    })
    
    it('Validando Retorno de course com course inexistente', () => {
        cy.request({
            method: 'GET',
            url: `${getUrlApi()}/lms/${getLmsIdCourse()}/courses/888888`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        
        })
    })
    
    it('Editando ', () => {
        cy.request({
            method: 'PUT',
            url: `${getUrlApi()}/lms/${getLmsIdCourse()}/courses/update/${getLmsIdNew()}`,
            
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                
                    "file_id":  null,
                    "title": "Curso de Ingles",
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
                      "card_thumb_hover_file_id" : 6,
                      "file_hover_id": 6
                
            }
        }).then((response) => {
            setLmsIDNew(response.body?.data?.courses?.id)
            expect(response.status).to.eq(200);
        })
    })
    
    it('Editando dados invalidos ', () => {
        cy.request({
            method: 'PUT',
            url: `${getUrlApi()}/lms/${getLmsIdCourse()}/courses/update/`,
            
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            body: {
                
                "filex_id": null,
                "titlxe": "Curso 2 xxQualquer",
                "descxription": "Descrição do Curso",
                "is_free": 1,
                "coins": "0",
                "price": "1000",
                "registxration_start": "12/01/2030 03:10:00",
                "registxration_end": "12/10/2x030 03:10:00",
                "course_end": "12/20/2030 03:10:00",
                "order": 0,
                "credit_cxoins": 0,
                    "card_home_enable": 1,
                    "show_tixtle_card": 1,
                  "card_thumb_file_id": 6,
                  "cardxxx_thumb_hover_file_id" : 6,
                  "file_hxxxover_id": 6
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(405);
    
        })
    })
    
    it('Duplicando course ', () => {
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/lms/${getLmsIdCourse()}/courses/duplicate/${getLmsIdCourseIDNew()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
        }).then((response) => {
            setLmsIDCourseDuplicate(response.body?.data?.courses?.id)
            expect(response.status).to.eq(200);
            expect(response.body.data.courses.title).to.include('Curso de Ingles (Copy)');
            console.log('LMS ID => ', getLmsIdCourseIDDuplicate())    
            
    
        })
    })
    
    it('Duplicando course com dados invalidos ', () => {
        cy.request({
            method: 'POST',
            url: `${getUrlApi()}/lms/${getLmsIdCourse()}/courses/duplicate/555555555`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
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
    
    it('deletando Course duplicado', () => {
        cy.request({
            method: 'DELETE',
            url: `${getUrlApi()}/lms/${getLmsIdCourse()}/courses/delete/${getLmsIdCourseIDDuplicate()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
        })
    })
    
    it('Validando que course foi deletado', () => {
        cy.request({
            method: 'DELETE',
            url: `${getUrlApi()}/lms/${getLmsIdCourse()}/courses/delete/${getLmsIdCourseIDNew()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        })
    })
    
    it('Validando que course duplicado foi deletado', () => {
        cy.request({
            method: 'DELETE',
            url: `${getUrlApi()}/lms/${getLmsIdCourse()}/courses/delete/${getLmsIdCourseIDDuplicate()}`,
            headers: {
                Authorization: getToken(),
                Accept: "application/json"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
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
})