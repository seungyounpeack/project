package kr.go.guri.cmm.config;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.WebApplicationInitializer;


/**
 * ComWebApplicationInitializer 클래스
 * <Notice>
 * 	   Servlet3.x WebApplicationInitializer 기능으로 처리
 * <Disclaimer>
 *		N/A
 *
 * @author 신용삼
 * @since 2019. 07. 08.
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일			수정자			수정내용
 *  -------    		-------------   ----------------------
 *  2019.07.08.   	신용삼          최초 생성
 *   
 * </pre>
 */


public class ComWebApplicationInitializer implements WebApplicationInitializer {

	private static final Logger LOGGER = LoggerFactory.getLogger(ComWebApplicationInitializer.class);
	
	@Override
	public void onStartup(ServletContext servletContext) throws ServletException {
		LOGGER.debug("=============================== ComWebApplicationInitializer START ===============================");

		// Web ServletContextListener 설정
		servletContext.addListener(new kr.go.guri.cmm.context.ComWebServletContextListener());

		LOGGER.debug("=============================== ComWebApplicationInitializer END ===============================");
	}
}
