package kr.go.guri.manager.noticeMng.insNotice.service;

import java.io.IOException;
import java.sql.SQLException;
import java.util.Map;

import kr.go.guri.cmm.vo.FileVO;
/**
 * 관리자 > 공지사항 등록 Service 클래스
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
public interface InsNoticeService {

	int selectPk() throws SQLException , IOException;

	int saveNotice(Map<String, Object> param) throws SQLException , IOException;

	int noticeFileUp(FileVO fileVO) throws Exception;


}
