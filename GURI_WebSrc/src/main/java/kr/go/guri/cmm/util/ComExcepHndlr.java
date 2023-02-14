package kr.go.guri.cmm.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import egovframework.rte.fdl.cmmn.exception.handler.ExceptionHandler;

/**
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
 *
 */
public class ComExcepHndlr implements ExceptionHandler {

	private static final Logger LOGGER = LoggerFactory.getLogger(ComExcepHndlr.class);

    /*
    @Resource(name = "otherSSLMailSender")
    private SimpleSSLMail mailSender;
     */
    /**
     * 발생된 Exception을 처리한다.
     */
    public void occur(Exception ex, String packageName) {
    	//log.debug(" EgovServiceExceptionHandler run...............");
    	
    	/*
		try {
			mailSender. send(ex, packageName);
			log.debug(" sending a alert mail  is completed ");		
		} catch (Exception e) {
			LOGGER.error(packageName, ex);
		}
		*/
		
    	LOGGER.error(packageName, ex);
	}
}
