package kr.go.guri.manager.inquiryMng.detailInquiry.service;

import java.io.IOException;
import java.sql.SQLException;
import java.util.Map;

/**
 * 관리자 > 문의 상세 Service 클래스
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

public interface DetailInquiryService {

	Map<String, Object> selectDetailList(Map<String, Object> params) throws SQLException , IOException;

	int updateInquiry(Map<String, Object> params) throws SQLException , IOException;

	int deleteInquiry(Map<String, Object> params) throws SQLException , IOException;

	int insertInquiry(Map<String, Object> params) throws Exception;


}
