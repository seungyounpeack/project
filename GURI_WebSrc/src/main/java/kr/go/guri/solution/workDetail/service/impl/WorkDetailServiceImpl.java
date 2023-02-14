package kr.go.guri.solution.workDetail.service.impl;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import kr.go.guri.solution.workDetail.service.WorkDetailService;
/**
 * 관리자 > 공지 상세 Service Implement 클래스
 * @author 백승연
 * @since 2022. 10. 26.
 * @version 0.1
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일			수정자			수정내용
 *  -------    		-------------   ----------------------
 *  2022.10.26.   	백승연		        최초 생성
 *   
 * </pre>
 */

@Service("workDetailService")//어노테이션을 사용해 이클립스가 이해하기 쉽게 이클립스 전용 주석으로 사용
//implements를 이용해 WorDetailService를 사용한다.
public class WorkDetailServiceImpl implements WorkDetailService{ 

	@Resource(name = "workDetailMapper")//@Resource 어노테이션은 빈의 이름을 이용해서 주입할 객체를 검색한다.(name = "" 안에 검색할 빈 입력)
	private WorkDetailMapper workDetailMapper;
	
	@Override
	public Map<String, Object> selectWorkList(Map<String, Object> params) throws SQLException, IOException {
		// TODO Auto-generated method stub
		return workDetailMapper.selectWorkList(params);//params를 workDetailMapper의 selectWorkList에 넣는다.
	}

	@Override
	public int updateView(Map<String, Object> params) throws SQLException, IOException {
		// TODO Auto-generated method stub
		return workDetailMapper.updateView(params);
	}

	@Override
	public int updateCommend(Map<String, Object> params) throws SQLException, IOException {
		// TODO Auto-generated method stub
		return workDetailMapper.updateCommend(params);
	}

	@Override
	public Map<String, Object> selectFileInfo(Map<String, Object> params) throws SQLException, IOException {
		// TODO Auto-generated method stub
		return workDetailMapper.selectFileInfo(params);
	}

	@Override
	public List<Map<String, Object>> selectReviewList(Map<String, Object> params) throws SQLException, IOException {
		// TODO Auto-generated method stub
		return workDetailMapper.selectReviewList(params);
	}

	@Override
	public int workReviewInsert(Map<String, Object> params) throws SQLException, IOException {
		// TODO Auto-generated method stub
		return workDetailMapper.workReviewInsert(params);
	}

	@Override
	public int workReviewDelete(Map<String, Object> params) throws SQLException, IOException {
		// TODO Auto-generated method stub
		return workDetailMapper.workReviewDelete(params);
	}


}
