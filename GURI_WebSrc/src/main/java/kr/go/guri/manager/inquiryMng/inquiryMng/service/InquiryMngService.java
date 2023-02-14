package kr.go.guri.manager.inquiryMng.inquiryMng.service;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.util.EgovMap;
/**
 * 관리자 > 문의 Service 클래스
* @author 권기완
* @since 2022. 06. 25.
* @version 1.0
* @see
*
* <pre>
* << 개정이력(Modification Information) >>
*
*  수정일			수정자			수정내용
*  -------    		-------------   ----------------------
*  2022.06.25.   	권기완          최초 생성
*   
* </pre>
*/
public interface InquiryMngService {

	List<Map<String, Object>> selectInquiryList(Map<String, Object> param) throws SQLException , IOException;

	int deleteInquiryList(EgovMap map) throws SQLException , IOException;

}
