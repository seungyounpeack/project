package kr.go.guri.cmm.context;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import kr.go.guri.cmm.util.GlobalProperties;

/**
 * EgovWebServletContextListener 클래스
 * <Notice>
 * 	    데이터베이스 설정을 spring.profiles.active 방식으로 처리 
 * 		(공통컴포넌트 특성상 데이터베이스별 분리/개발,검증,운영서버로 분리 가능)
 * <Disclaimer>
 *		N/A
 *
 * @author 장동한
 * @since 2016.06.23
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *   수정일        수정자           수정내용
 *  -------      -------------  ----------------------
 *   2016.06.23  장동한           최초 생성
 *   2017.03.03     조성원 	시큐어코딩(ES)-오류 메시지를 통한 정보노출[CWE-209]
 * </pre>
 */

public class ComWebServletContextListener implements ServletContextListener {
	private static final Logger LOGGER = LoggerFactory.getLogger(ComWebServletContextListener.class);
    
    public ComWebServletContextListener(){
    	setEgovProfileSetting();
    }

    public void contextInitialized(ServletContextEvent event){
    	if(System.getProperty("spring.profiles.active") == null){
    		setEgovProfileSetting();
    	}
    }

    public void contextDestroyed(ServletContextEvent event) {
    	if(System.getProperty("spring.profiles.active") != null){
    		System.clearProperty("spring.profiles.active");
    		//System.setProperty("spring.profiles.active", null);
    	}
    } 

    
    public void setEgovProfileSetting(){
    	LOGGER.info("ComWebServletContextListener - setEgovProfileSetting 호출");
        try {
            LOGGER.debug("===========================Start ServletContextLoad START ===========");
            System.setProperty("spring.profiles.active", GlobalProperties.getProperty("Globals.DbType")+","+GlobalProperties.getProperty("Globals.Auth"));
            //LOGGER.debug("Setting spring.profiles.active>"+System.getProperty("spring.profiles.active"));
            //LOGGER.debug("===========================END   ServletContextLoad END ===========");
        //2017.03.03 	조성원 	시큐어코딩(ES)-오류 메시지를 통한 정보노출[CWE-209]
        } catch(IllegalArgumentException e) {
    		LOGGER.error("[IllegalArgumentException] Try/Catch...usingParameters Runing : "+ e);
        } catch (Exception e) {
        	LOGGER.error("[" + e.getClass() +"] search fail : " + e);
        }
    }
}
