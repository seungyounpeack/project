package kr.go.guri.manager.noticeMng.detailNotice.service;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
/**
 * 관리자 > 공지 상세 Service 클래스
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
public interface DetailNoticeService {

	Map<String, Object> selectDetailList(Map<String, Object> params) throws SQLException , IOException;

	Map<String, Object> selectFileInfo(Map<String, Object> params) throws SQLException , IOException;
	
	// 다중 파일 데이터 가져오기 
	List<Map<String, Object>> selectFilesInfo(Map<String, Object> params) throws SQLException , IOException;
	// 게시물 내용 가져오기 
	List<Map<String, Object>> selectDetailInfo(Map<String, Object> params) throws SQLException , IOException;
}
