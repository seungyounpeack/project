package kr.go.guri.solution.workDetail.service;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
/**
 * 관리자 > 공지 상세 Service 클래스
* @author 백승연
* @since 2022. 10. 26.
* @version 0.1
* @see
*
* <pre>
* << 개정이력(Modification Information) >>
*
*  수정일				수정자			수정내용
*  -------    		-------------   ----------------------
*  2022.10.26.   	백승연          		최초 생성
*   
* </pre>
*/
/*서비스는 interface를 사용한다.*/
public interface WorkDetailService {
	//map의 selectWorkList에 params를 넣는다.
	Map<String, Object> selectWorkList(Map<String, Object> params) throws SQLException , IOException;
	// 조회 시 +1
	int updateView(Map<String, Object> params) throws SQLException , IOException;
	// 추천 클릭시 +1
	int updateCommend(Map<String, Object> params) throws SQLException , IOException;
	// 파일정보 가져오기
	Map<String, Object> selectFileInfo(Map<String, Object> params) throws SQLException , IOException;
	// 리뷰 리스트 가져오기
	List<Map<String, Object>> selectReviewList(Map<String, Object> params) throws SQLException , IOException;
	// 리뷰 등록
	int workReviewInsert(Map<String, Object> params) throws SQLException , IOException;
	// 리뷰 삭제
	int workReviewDelete(Map<String, Object> params) throws SQLException , IOException;

}
